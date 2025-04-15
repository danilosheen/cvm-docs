import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
  displayedColumns: string[] = ['nome', 'dataNascimento', 'contato', 'cpf', 'documento', 'acao'];
  dataSource: MatTableDataSource<ICliente>;
  clientes: ICliente[] = [];
  readonly dialog = inject(MatDialog);
  readonly dialogCliente = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private authService: AuthService,
    private clienteService: ClienteService
  ) {
    this.dataSource = new MatTableDataSource<ICliente>();
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Remover cliente',
        dialogContent: 'Você tem certeza que deseja remover o cliente?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.removeItem(id);
      }
    });
  }

  adicionarCliente(enterAnimationDuration: string, exitAnimationDuration: string): void{
    const dialogRef = this.dialogCliente.open(DialogClienteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clienteService.create(result).subscribe((response)=>{
          this.carregarClientes();
        })
      }
    });
  }

  removeItem(id: string){
    this.clienteService.delete(id).subscribe(() => {
      this.carregarClientes();
    });
  }
}
