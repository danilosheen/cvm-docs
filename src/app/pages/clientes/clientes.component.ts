import { AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { ICliente } from '../../interfaces/i-cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { NgIf } from '@angular/common';
import { DialogClienteComponent } from '../../shared/components/dialog-cliente/dialog-cliente.component';

@Component({
  selector: 'app-clientes',
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    LoadingBlueComponent,
    NgIf
],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'dataNascimento', 'contato', 'acao'];
  dataSource: MatTableDataSource<ICliente>;
  clientes: ICliente[] = [];
  readonly dialog = inject(MatDialog);
  readonly dialogCliente = inject(MatDialog);
  isClient = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.dataSource = new MatTableDataSource<ICliente>();
    this.customizarPaginador();
  }

  ngAfterViewInit() {
    if (this.authService.getToken()) {
      this.carregarClientes();
    }
  }

  carregarClientes() {
    this.clienteService.getAll().subscribe(result => {
      this.clientes = result;
      this.dataSource.data = this.clientes;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.clientes.length == 0){
          this.isClient = false;
        }
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAdicionarCliente(enterAnimationDuration: string, exitAnimationDuration: string): void{
    const dialogRef = this.dialogCliente.open(DialogClienteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'adicionar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((cliente: ICliente) => {
      if (cliente) {
        this.clienteService.create(cliente).subscribe((response) => {
          const listaTemp = [...this.dataSource.data, response];
          listaTemp.sort((a, b) => a.nome.localeCompare(b.nome));
          this.clientes = listaTemp;
          this.dataSource.data = this.clientes;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isClient = this.dataSource.data.length > 0;
        });
      }
    });
  }

  openEditarCliente(enterAnimationDuration: string, exitAnimationDuration: string, cliente: ICliente): void{
    const dialogRef = this.dialogCliente.open(DialogClienteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        cliente: cliente,
        title: 'editar',
        confirmButton: 'Atualizar'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.editarCliente(cliente.id!, cliente)
      }
    });
  }

  openRemoverCliente(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Remover cliente',
        dialogContent: 'Você tem certeza que deseja remover o cliente?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.removerCliente(id);
      }
    });
  }

  editarCliente(id: string, cliente: ICliente){
    const updatedAt = new Date().toISOString();
    cliente.updatedAt = updatedAt;
    this.clienteService.update(id, cliente).subscribe(()=>{
    })
  }

  removerCliente(id: string) {
    this.clienteService.delete(id).subscribe(() => {
      const listaTemp = this.dataSource.data.filter(cliente => cliente.id !== id);
      this.clientes = listaTemp;
      this.dataSource.data = this.clientes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isClient = this.clientes.length > 0;
    });
  }

  // Personalização do paginator do Angular Material
  customizarPaginador() {
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
    this.paginatorIntl.nextPageLabel = 'Próxima página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primeira página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }
}
