import { Component, inject, ViewChild} from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { NgIf } from '@angular/common';
import { DialogClienteComponent } from '../../shared/components/dialog-cliente/dialog-cliente.component';
import { DialogViewComponent } from '../../shared/components/dialog-view/dialog-view.component';
import { IPassageiro } from '../../interfaces/i-passageiro';
import { PassageiroService } from '../../core/services/passageiroService/passageiro-service.service';
import { DialogPassageiroComponent } from '../../shared/components/dialog-passageiro/dialog-passageiro.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    NgIf
  ],
  templateUrl: './passageiros.component.html',
  styleUrl: './passageiros.component.css'
})
export class PassageirosComponent {
  displayedColumns: string[] = ['nome', 'tipoDocumento', 'documento', 'acao'];
  dataSource: MatTableDataSource<IPassageiro>;
  passageiros: IPassageiro[] = [];
  readonly dialog = inject(MatDialog);
  readonly dialogPassageiro = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  hasPassageiro = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private authService: AuthService,
    private passageiroService: PassageiroService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.dataSource = new MatTableDataSource<IPassageiro>();
    this.customizarPaginador();
  }

  ngAfterViewInit() {
    if (this.authService.getToken()) {
      this.carregarPassageiros();
    }
  }

  carregarPassageiros() {
    this.passageiroService.getAll().subscribe(result => {
      this.passageiros = result;
      this.dataSource.data = this.passageiros;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.passageiros.length == 0){
          this.hasPassageiro = false;
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

  openVisualizarPassageiro(enterAnimationDuration: string, exitAnimationDuration: string, passageiro: IPassageiro){
    const dialogRef = this.dialogPassageiro.open(DialogViewComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        pessoa: passageiro,
        type: 'passageiro'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.editarCliente(cliente.id!, cliente)
      }
    });

  }

  openAdicionarPassageiro(enterAnimationDuration: string, exitAnimationDuration: string): void{
    const dialogRef = this.dialogPassageiro.open(DialogPassageiroComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'adicionar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((passageiro: IPassageiro) => {
      if (passageiro) {
        this.passageiroService.create(passageiro).subscribe((response) => {
          const listaTemp = [...this.dataSource.data, response];
          listaTemp.sort((a, b) => a.nome.localeCompare(b.nome));
          this.passageiros = listaTemp;
          this.dataSource.data = this.passageiros;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.hasPassageiro = this.dataSource.data.length > 0;
        });
      }
    });
  }

  openEditarPassageiro(enterAnimationDuration: string, exitAnimationDuration: string, passageiro: IPassageiro): void{
    const dialogRef = this.dialogPassageiro.open(DialogPassageiroComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        passageiro: passageiro,
        title: 'editar',
        confirmButton: 'Atualizar'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.editarPassageiro(passageiro.id!, passageiro);
      } else {
        this.carregarPassageiros();
      }
    });
  }

  openRemoverPassageiro(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Remover passageiro',
        dialogContent: 'Você tem certeza que deseja remover o passageiro?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.removerPassageiro(id);
      }
    });
  }

  editarPassageiro(id: string, passageiro: IPassageiro){
    this.passageiroService.update(id, passageiro).subscribe(()=>{
    })
  }

  removerPassageiro(id: string) {
    this.passageiroService.delete(id).subscribe({
      next: (response) => {
        const listaTemp = this.dataSource.data.filter(cliente => cliente.id !== id);
        this.passageiros = listaTemp;
        this.dataSource.data = this.passageiros;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.hasPassageiro = this.passageiros.length > 0;
        this.snackBar.open(response.message, 'Ok', {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (error) => {
        const errorMsg = error?.error?.error || 'Erro ao remover passageiro';
        this.snackBar.open(errorMsg, 'Ok', {
          duration: 10000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
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
