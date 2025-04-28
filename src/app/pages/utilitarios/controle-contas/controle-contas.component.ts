import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { FluxoCaixaService } from '../../../core/services/fluxoCaixaService/fluxo-caixa.service';
import { IFluxoCaixa } from '../../../interfaces/i-fluxo-caixa';
import { DataFormatadaPipe } from "../../../pipes/data-formatada.pipe";
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogFluxoComponent } from '../../../shared/components/dialog-fluxo/dialog-fluxo.component';
import { MatButtonModule } from '@angular/material/button';
import { BrCurrencyPipe } from '../../../pipes/br-currency.pipe';
import { DialogGenericComponent } from '../../../shared/components/dialog-generic/dialog-generic.component';

@Component({
  selector: 'app-controle-contas',
  imports: [
    NavbarComponent,
    FooterComponent,
    DataFormatadaPipe,
    NgClass,
    MatButtonModule,
    BrCurrencyPipe
],
  templateUrl: './controle-contas.component.html',
  styleUrl: './controle-contas.component.css'
})
export class ControleContasComponent {

  fluxoService = inject(FluxoCaixaService);
  fluxos: IFluxoCaixa[] = [];
  saldoAnterior = 0;
  entradas = [];
  saidas = [];
  saldoRestante = 0;
  dialog = inject(MatDialog);

  constructor(){
    this.fluxoService.getAll().subscribe(fluxos =>{
      this.fluxos = fluxos;
    })
  }

  openAdicionarFluxo(): void{
    const dialogRef = this.dialog.open(DialogFluxoComponent, {
      data: {
        title: 'adicionar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((fluxo: IFluxoCaixa) => {
      if (fluxo) {
        this.fluxoService.create(fluxo).subscribe(response =>{
          this.fluxos = [response, ...this.fluxos]
        })
      }
    });
  }

  openEditarMovimentacao(fluxo: IFluxoCaixa): void{
      const dialogRef = this.dialog.open(DialogFluxoComponent, {
        data: {
          fluxo: fluxo,
          title: 'editar',
          confirmButton: 'Atualizar',
          editFluxo: true
        }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.fluxoService.update(fluxo.id!, fluxo).subscribe(response=>{
            console.log(response)
          });
        }
      });
    }

    openRemoverMovimentacao(id: string): void {
      const dialogRef = this.dialog.open(DialogGenericComponent, {
        data: {
          dialogTitle: 'Remover movimentação',
          dialogContent: 'Você tem certeza que deseja remover esta movimentação?',
        }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.fluxoService.delete(id).subscribe(response =>{
            this.fluxos = this.fluxos.filter(i => i.id != id);
          })
        }
      });
    }

  // saldoAnterior(){

  // }
}
