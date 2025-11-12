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
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { NgIf } from '@angular/common';
import { DialogViewComponent } from '../../shared/components/dialog-view/dialog-view.component';
import { IPassageiro } from '../../interfaces/i-passageiro';
import { PassageiroService } from '../../core/services/passageiroService/passageiro-service.service';
import { DialogPassageiroComponent } from '../../shared/components/dialog-passageiro/dialog-passageiro.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-passageiros',
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
    MatCardModule
  ],
  templateUrl: './passageiros.component.html',
  styleUrl: './passageiros.component.css'
})
export class PassageirosComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'tipoDocumento', 'documento', 'acao'];
  dataSource = new MatTableDataSource<IPassageiro>();
  paginatedData: IPassageiro[] = [];
  passageiros: IPassageiro[] = [];
  readonly dialog = inject(MatDialog);
  readonly dialogPassageiro = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  hasPassageiro = true;
  widthScreen = window.innerWidth;

  private filter$ = new BehaviorSubject<string>('');
  private initialized = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private passageiroService: PassageiroService,
    private paginatorIntl: MatPaginatorIntl,
    private breakpointObserver: BreakpointObserver
  ) {
    this.customizarPaginador();
  }

  ngAfterViewInit() {
    if (this.authService.getToken()) {
      this.carregarPassageiros();

      // Detecta modo mobile/desktop
      this.breakpointObserver.observe([Breakpoints.Handset])
        .subscribe(result => this.widthScreen = result.matches ? 600 : 1024);
    }
  }

  private initPaginationSync() {
    if (this.initialized || !this.paginator) return;
    this.initialized = true;

    combineLatest([
      this.filter$.pipe(startWith('')),
      this.paginator.page.pipe(startWith({ pageIndex: 0, pageSize: this.paginator.pageSize || 10 })),
    ])
      .pipe(
        map(([filter, page]) => {
          this.dataSource.filter = filter.trim().toLowerCase();
          const filtered = this.dataSource.filteredData;
          const start = (page as any).pageIndex * (page as any).pageSize;
          const end = start + (page as any).pageSize;
          return filtered.slice(start, end);
        })
      )
      .subscribe(paged => this.paginatedData = paged);

    // força emissão inicial
    this.filter$.next(this.filter$.value);
  }

  carregarPassageiros() {
    this.passageiroService.getAll().subscribe(result => {
      this.passageiros = result;
      this.dataSource.data = this.passageiros;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.hasPassageiro = this.passageiros.length > 0;
        this.initPaginationSync();

        // atualização inicial dos cards
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        const endIndex = startIndex + this.paginator.pageSize;
        this.paginatedData = this.dataSource.filteredData.slice(startIndex, endIndex);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue);
    if (this.paginator) this.paginator.firstPage();
  }

  openVisualizarPassageiro(enter: string, exit: string, passageiro: IPassageiro) {
    this.dialogPassageiro.open(DialogViewComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { pessoa: passageiro, type: 'passageiro' }
    });
  }

  openAdicionarPassageiro(enter: string, exit: string): void {
    const dialogRef = this.dialogPassageiro.open(DialogPassageiroComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { title: 'adicionar', confirmButton: 'Salvar' }
    });

    dialogRef.afterClosed().subscribe((passageiro: IPassageiro) => {
      if (passageiro) {
        this.passageiroService.create(passageiro).subscribe((response) => {
          const novaLista = [...this.dataSource.data, response].sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );
          this.passageiros = novaLista;
          this.dataSource.data = novaLista;
          this.hasPassageiro = true;
          this.filter$.next(this.filter$.value);
          this.snackBar.open('Passageiro adicionado com sucesso!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
          });
        });
      }
    });
  }

  openEditarPassageiro(enter: string, exit: string, passageiro: IPassageiro): void {
    const dialogRef = this.dialogPassageiro.open(DialogPassageiroComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: { passageiro, title: 'editar', confirmButton: 'Atualizar' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.editarPassageiro(passageiro.id!, passageiro);
      else this.carregarPassageiros();
    });
  }

  openRemoverPassageiro(enter: string, exit: string, id: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
      data: {
        dialogTitle: 'Remover passageiro',
        dialogContent: 'Você tem certeza que deseja remover o passageiro?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.removerPassageiro(id);
    });
  }

  editarPassageiro(id: string, passageiro: IPassageiro) {
    this.passageiroService.update(id, passageiro).subscribe(() => {
      this.snackBar.open('Passageiro atualizado com sucesso', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }

  removerPassageiro(id: string) {
    this.passageiroService.delete(id).subscribe({
      next: (response) => {
        const novaLista = this.dataSource.data.filter(p => p.id !== id);
        this.passageiros = novaLista;
        this.dataSource.data = novaLista;
        this.hasPassageiro = novaLista.length > 0;
        this.filter$.next(this.filter$.value);
        this.snackBar.open(response.message, 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        const errorMsg = error?.error?.error || 'Erro ao remover passageiro';
        this.snackBar.open(errorMsg, 'Ok', {
          duration: 6000,
          verticalPosition: 'top',
        });
      }
    });
  }

  // Personalização do paginator
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
