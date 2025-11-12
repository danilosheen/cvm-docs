import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { ICliente } from '../../interfaces/i-cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { NgIf } from '@angular/common';
import { DialogClienteComponent } from '../../shared/components/dialog-cliente/dialog-cliente.component';
import { DialogViewComponent } from '../../shared/components/dialog-view/dialog-view.component';
import { Router } from '@angular/router';
import { DataFormatadaPipe } from "../../pipes/data-formatada.pipe";
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    NgIf,
    DataFormatadaPipe,
    MatCardModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'dataNascimento', 'contato', 'ultimaViagem', 'acao'];
  dataSource = new MatTableDataSource<ICliente>();
  clientes: ICliente[] = [];
  paginatedData: ICliente[] = [];
  readonly dialog = inject(MatDialog);
  readonly dialogCliente = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  widthScreen = window.innerWidth;
  hasClient = true;
  private initialized = false;

  private filter$ = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private paginatorIntl: MatPaginatorIntl,
  ) {
    this.customizarPaginador();
  }

  ngAfterViewInit() {
    if (this.authService.getToken()) {
      this.carregarClientes();
    }
  }

  private initPaginationSync() {
    if (this.initialized) return;
    if (!this.paginator) return;

    this.initialized = true;

    combineLatest([
      this.filter$.pipe(startWith('')),
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: this.paginator.pageSize || 10 })),
    ])
      .pipe(
        map(([filter, page]) => {
          this.dataSource.filter = (filter ?? '').trim().toLowerCase();
          const filtered = this.dataSource.filteredData;
          const start = (page as any).pageIndex * (page as any).pageSize;
          const end = start + (page as any).pageSize;
          return filtered.slice(start, end);
        })
      )
      .subscribe(paged => {
        this.paginatedData = paged;
      });
    this.filter$.next(this.filter$.value);
  }

  carregarClientes() {
    this.clienteService.getAll().subscribe(result => {
      this.clientes = result;
      this.dataSource.data = this.clientes;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.hasClient = this.clientes.length > 0;
        this.initPaginationSync();

        if (!this.paginatedData || this.paginatedData.length === 0) {
          const startIndex = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 10);
          const endIndex = startIndex + (this.paginator?.pageSize ?? 10);
          this.paginatedData = this.dataSource.filteredData.slice(startIndex, endIndex);
        }
      }, 0);
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter$.next(value);
    this.paginator.firstPage();
  }

  openVisualizarCliente(enter: string, exit: string, cliente: ICliente) {
    this.dialogCliente.open(DialogViewComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { pessoa: cliente, type: 'cliente' },
    });
  }

  openAdicionarCliente(enter: string, exit: string): void {
    const dialogRef = this.dialogCliente.open(DialogClienteComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { title: 'adicionar', confirmButton: 'Salvar' },
    });

    dialogRef.afterClosed().subscribe((cliente: ICliente) => {
      if (cliente) {
        this.clienteService.create(cliente).subscribe((response) => {
          const novaLista = [...this.dataSource.data, response].sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          this.clientes = novaLista;
          this.dataSource.data = novaLista;
          this.hasClient = true;
          this.snackBar.open('Cliente adicionado com sucesso!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
          });
        });
      }
    });
  }

  openEditarCliente(enter: string, exit: string, cliente: ICliente): void {
    const dialogRef = this.dialogCliente.open(DialogClienteComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { cliente, title: 'editar', confirmButton: 'Atualizar' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.editarCliente(cliente.id!, cliente);
      else this.carregarClientes();
    });
  }

  openRemoverCliente(enter: string, exit: string, id: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: {
        dialogTitle: 'Remover cliente',
        dialogContent: 'Você tem certeza que deseja remover o cliente?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.removerCliente(id);
    });
  }

  editarCliente(id: string, cliente: ICliente) {
    this.clienteService.update(id, cliente).subscribe({
      next: () => {
        this.snackBar.open('Cliente atualizado com sucesso', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar o cliente', 'Ok', {
          duration: 6000,
          verticalPosition: 'top',
        });
      },
    });
  }

  removerCliente(id: string) {
    this.clienteService.delete(id).subscribe(() => {
      const novaLista = this.dataSource.data.filter(c => c.id !== id);
      this.clientes = novaLista;
      this.dataSource.data = novaLista;
      this.hasClient = novaLista.length > 0;
      this.snackBar.open('Cliente removido com sucesso', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }

  customizarPaginador() {
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
    this.paginatorIntl.nextPageLabel = 'Próxima página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primeira página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) return `0 de ${length}`;
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }
}
