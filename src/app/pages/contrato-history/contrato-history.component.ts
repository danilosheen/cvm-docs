import { Component, inject } from '@angular/core';
import { IContratoHistory } from '../../interfaces/i-contrato-history';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { ContratoHistoryService } from '../../core/services/contratoHistoryService/contrato-history.service';
import { BrCurrencyPipe } from "../../pipes/br-currency.pipe";
import { DataFormatadaPipe } from "../../pipes/data-formatada.pipe";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";

@Component({
  selector: 'app-contrato-history',
  imports: [BrCurrencyPipe, DataFormatadaPipe, FooterComponent, NavbarComponent, LoadingBlueComponent],
  templateUrl: './contrato-history.component.html',
  styleUrl: './contrato-history.component.css'
})
export class ContratoHistoryComponent {
  contratoHistoryService = inject(ContratoHistoryService);
  dialog = inject(MatDialog)
  router = inject(Router);
  contratoBehaviorSubject = inject(BehaviorSubjectService);
  contratos: IContratoHistory[] = [];
  isLoading = false;

  widthScreen = window.innerWidth;

  constructor(){
    this.isLoading = true;
    this.contratoHistoryService.getContratoHistory().subscribe({
      next:(result) => {
        this.contratos = result.contratos;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
      }
    })
  }

  editarOrcamentoHistory(contrato: IContratoHistory){
    this.contratoBehaviorSubject.setContrato(contrato);
    this.router.navigate(['/contrato']);
  }

  openRemoverOrcamentoHistory(id: string){
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      data: {
        dialogTitle: 'Remover contrato do histórico',
        dialogContent: 'Você tem certeza que deseja remover este contrato?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.contratoHistoryService.removeContratoHistory(id).subscribe({
          next: (result) => {
            console.log(result);
            this.contratos = this.contratos.filter(contrato => contrato.id !== id);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }
}
