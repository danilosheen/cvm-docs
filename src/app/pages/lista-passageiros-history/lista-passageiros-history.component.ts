import { Component, inject } from '@angular/core';
import { BrCurrencyPipe } from "../../pipes/br-currency.pipe";
import { IListaPassageiros } from '../../interfaces/i-listaPassageiros';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ListaPassageirosHistoryService } from '../../core/services/listaPassageirosHistoryService/lista-passageiros-history.service';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { DataFormatadaPipe } from "../../pipes/data-formatada.pipe";
import { IListaPassageirosHistory } from '../../interfaces/i-listaPassageirosHistory';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';

@Component({
  selector: 'app-lista-passageiros-history',
  imports: [LoadingBlueComponent, NavbarComponent, FooterComponent, DataFormatadaPipe],
  templateUrl: './lista-passageiros-history.component.html',
  styleUrl: './lista-passageiros-history.component.css'
})
export class ListaPassageirosHistoryComponent {

  listaPassageirosHistoryService = inject(ListaPassageirosHistoryService);
  listaPassageirosBehaviorSubject = inject(BehaviorSubjectService);
  dialog = inject(MatDialog);
  router = inject(Router);
  // orcamentoBehaviorSubject = inject(OrcamentoBehaviorSubjectService)
  listasPassageiros: IListaPassageirosHistory[] = [];
  isLoading = false;

  widthScreen = window.innerWidth;

  constructor(){
    this.isLoading = true;
    this.listaPassageirosHistoryService.getListaPassageirosHistory().subscribe({
      next:(result) => {
        this.listasPassageiros = result.listasPassageiros;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
      }
    });
  }

  editarListaPassageirosHistory(listaPassageiros: IListaPassageirosHistory){
    this.listaPassageirosBehaviorSubject.setListaPassageiros(listaPassageiros);
    this.router.navigate(['/lista-passageiros']);
  }

  openRemoverListaPassageirosHistory(id: string){
    const dialogRef = this.dialog.open(DialogGenericComponent, {
          data: {
            dialogTitle: 'Remover lista de passageiros do histórico',
            dialogContent: 'Você tem certeza que deseja remover esta lista de passageiros?',
          }
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.listaPassageirosHistoryService.removeListaPassageirosHistory(id).subscribe({
              next: (result) => {
                console.log(result);
                this.listasPassageiros = this.listasPassageiros.filter(listaPassageiros => listaPassageiros.id !== id);
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
        });
  }
}
