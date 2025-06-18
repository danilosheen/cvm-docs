import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { OrcamentoHistoryService } from '../../core/services/orcamentoHistoryService/orcamento-history.service';
import { DataFormatadaPipe } from "../../pipes/data-formatada.pipe";
import { IOrcamentoHistory } from '../../interfaces/i-orcamentoHistory';
import { BrCurrencyPipe } from "../../pipes/br-currency.pipe";
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { Router } from '@angular/router';
import { OrcamentoBehaviorSubjectService } from '../../core/services/orcamentoBehaviorSubjectService/orcamento-behavior-subject.service';

@Component({
  selector: 'app-orcamento-history',
  imports: [
    NavbarComponent,
    FooterComponent,
    DataFormatadaPipe,
    BrCurrencyPipe,
    LoadingBlueComponent
  ],
  templateUrl: './orcamento-history.component.html',
  styleUrl: './orcamento-history.component.css'
})
export class OrcamentoHistoryComponent {

  orcamentoHistoryService = inject(OrcamentoHistoryService);
  dialog = inject(MatDialog)
  router = inject(Router)
  orcamentoBehaviorSubject = inject(OrcamentoBehaviorSubjectService)
  orcamentos: IOrcamentoHistory[] = [];
  isLoading = false;

  widthScreen = window.innerWidth;

  constructor(){
    this.isLoading = true;
    this.orcamentoHistoryService.getOrcamentoHistory().subscribe({
      next:(result) => {
        this.orcamentos = result.orcamentos;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
      }
    })
  }

  editarOrcamentoHistory(orcamento: IOrcamentoHistory){
    this.orcamentoBehaviorSubject.setOrcamento(orcamento);
    this.router.navigate(['/orcamento']);
  }

  openRemoverOrcamentoHistory(id: string){
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      data: {
        dialogTitle: 'Remover orcamento do histórico',
        dialogContent: 'Você tem certeza que deseja remover este orçamento?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.orcamentoHistoryService.removeOrcamentoHistory(id).subscribe({
          next: (result) => {
            console.log(result);
            this.orcamentos = this.orcamentos.filter(orcamento => orcamento.id !== id);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }
}
