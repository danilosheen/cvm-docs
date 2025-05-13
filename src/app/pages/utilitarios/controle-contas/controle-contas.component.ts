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
import { InputMonthYearComponent } from "../../../shared/components/input-month-year/input-month-year.component";
import { DialogSaldoComponent } from '../../../shared/components/dialog-saldo/dialog-saldo.component';
import { SaldoAnteriorService } from '../../../core/services/saldoAnteriorService/saldo-anterior.service';

@Component({
  selector: 'app-controle-contas',
  imports: [
    NavbarComponent,
    FooterComponent,
    DataFormatadaPipe,
    NgClass,
    MatButtonModule,
    BrCurrencyPipe,
    InputMonthYearComponent
],
  templateUrl: './controle-contas.component.html',
  styleUrl: './controle-contas.component.css'
})
export class ControleContasComponent {

  fluxoService = inject(FluxoCaixaService);
  fluxos: any[] = [];
  entradas: number[] = [];
  saidas: number[] = [];
  dialog = inject(MatDialog);
  saldoAnteriorService = inject(SaldoAnteriorService);
  data = new Date();
  mesAtual = this.data.getMonth() + 1;
  anoAtual = this.data.getFullYear();
  private _mesAnoSelected = {mes: this.mesAtual, ano: this.anoAtual}


  saldoAnterior = 0;
  somaEntradas = 0;
  somaSaidas = 0;
  saldoRestante = 0;

  constructor(){
    this.carregarFluxos();
    this.carregarSaldoAnterior();
  }

  get mesAnoSelected() {
    return this._mesAnoSelected;
  }

  set mesAnoSelected(value: { mes: number, ano: number }) {
    this._mesAnoSelected = value;
    this.carregarFluxos();
    this.carregarSaldoAnterior();
  }

  carregarFluxos(){
    this.fluxoService.getByMonthYear(
      this.mesAnoSelected.mes, this.mesAnoSelected.ano).subscribe({
      next:(fluxos =>{
        this.fluxos = fluxos;
        this.atualizarSaldo();
      }),
      error:(error=>{
        console.log(error);
      })
    });
  }

  carregarSaldoAnterior(){
    this.saldoAnteriorService.buscarSaldoAnterior(this.mesAnoSelected.mes, this.mesAnoSelected.ano).subscribe({
      next:(response)=>{
        this.saldoAnterior = response.saldoAnterior;
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
        this.saldoAnterior = 0;
      }
    })
  }

  gerarRelatorioMensal(){
    const relatorioData = {
      fluxos: this.fluxos,
      saldoAnterior: this.saldoAnterior,
      somaEntradas: this.somaEntradas,
      somaSaidas: this.somaSaidas,
      saldoRestante: this.saldoRestante
    }
    console.log(relatorioData)
  }

  openAdicionarMovimentacao(): void{

    const dialogRef = this.dialog.open(DialogFluxoComponent, {
      data: {
        title: 'adicionar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((fluxo: IFluxoCaixa) => {
      if (fluxo) {
        this.fluxoService.create(fluxo).subscribe(response =>{
          // this.fluxos = [response, ...this.fluxos]
          this.carregarFluxos();
        })
      }
    });
  }

  openEditarMovimentacao(fluxo: IFluxoCaixa, i: number): void{

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
        this.fluxoService.update(fluxo.id!, fluxo).subscribe(()=>{
          this.atualizarSaldo();
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
          this.atualizarSaldo();
        })
      }
    });
  }

  openAdicionarSaldoAnterior(){
    const dialogRef = this.dialog.open(DialogSaldoComponent, {
      data: {
        dialogTitle: "Atualizar saldo anterior",
        dialogContent: "Insira o valor do saldo anterior",
        saldoAnterior: this.saldoAnterior
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      const valorFormatado = parseFloat(result.replace(".", "").replace(",", "."));
      const mesAtual = this.mesAnoSelected.mes.toString().padStart(2, "0");
      const anoAtual = this.mesAnoSelected.ano.toString();
      this.saldoAnteriorService.adicionarSaldoAnterior({
        mes: mesAtual, ano: anoAtual, saldoAnterior: valorFormatado
        }).subscribe({
          next:(response)=>{
            this.saldoAnterior = valorFormatado;
            this.saldoRestante = this.saldoAnterior + this.somaEntradas - this.somaSaidas;
          },
          error:(error)=>{
            console.log(error)
          }
      });
    });
  }

  atualizarEntradas(){
    this.entradas = [];
    if(this.fluxos.length > 0){
      this.fluxos.forEach(fluxo=>{
        if(fluxo.tipo === "ENTRADA"){
          let valorNumerico = parseFloat(fluxo.valor);
          this.entradas.push(valorNumerico);
        }
      })
    }
  }

  atualizarSaidas(){
    this.saidas = [];
    if(this.fluxos.length > 0){
      this.fluxos.forEach(fluxo=>{
        if(fluxo.tipo === "SAIDA"){
          let valorNumerico = parseFloat(fluxo.valor);
          this.saidas.push(valorNumerico);
        }
      })
    }
  }

  atualizarSaldo(){
    this.atualizarEntradas();
    this.atualizarSaidas();
    if(this.fluxos.length > 0){
      this.somaEntradas = 0;
      this.somaSaidas = 0;
      this.entradas.forEach(entrada=>{this.somaEntradas += entrada});
      this.saidas.forEach(saida=>{this.somaSaidas += saida});
      this.saldoRestante = this.saldoAnterior + this.somaEntradas - this.somaSaidas;
    } else {
      this.saldoRestante = this.saldoAnterior;
    }
  }

  updateMonthYearSelectedHandler(value: any){
    const dataMoment = value;
    const mes = dataMoment.format("MM")
    const ano = dataMoment.format("YYYY")
    this.mesAnoSelected = {mes: mes, ano: ano}
  }
}
