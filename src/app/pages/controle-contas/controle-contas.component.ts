import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FluxoCaixaService } from '../../core/services/fluxoCaixaService/fluxo-caixa.service';
import { IFluxoCaixa } from '../../interfaces/i-fluxo-caixa';
import { DataFormatadaPipe } from "../../pipes/data-formatada.pipe";
import { NgClass, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogFluxoComponent } from '../../shared/components/dialog-fluxo/dialog-fluxo.component';
import { MatButtonModule } from '@angular/material/button';
import { BrCurrencyPipe } from '../../pipes/br-currency.pipe';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { InputMonthYearComponent } from "../../shared/components/input-month-year/input-month-year.component";
import { DialogSaldoComponent } from '../../shared/components/dialog-saldo/dialog-saldo.component';
import { SaldoAnteriorService } from '../../core/services/saldoAnteriorService/saldo-anterior.service';
import { IRelatorioMensal } from '../../interfaces/i-relatorioMensal';
import { GerarRelatorioService } from '../../core/services/gerarRelatorioService/gerar-relatorio.service';
import { catchError, of } from 'rxjs';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";

@Component({
  selector: 'app-controle-contas',
  imports: [
    NavbarComponent,
    FooterComponent,
    DataFormatadaPipe,
    NgClass,
    MatButtonModule,
    BrCurrencyPipe,
    InputMonthYearComponent,
    NgIf,
    LoadingBlueComponent
],
  templateUrl: './controle-contas.component.html',
  styleUrl: './controle-contas.component.css'
})
export class ControleContasComponent {

  fluxoService = inject(FluxoCaixaService);
  relatorioService = inject(GerarRelatorioService);
  saldoAnteriorService = inject(SaldoAnteriorService);
  dialog = inject(MatDialog);

  widthScreen = window.innerWidth;
  fluxos: any[] = [];
  entradas: number[] = [];
  saidas: number[] = [];
  data = new Date();
  mesAtual = this.data.getMonth() + 1;
  anoAtual = this.data.getFullYear();
  mesAnoAtual = `${this.mesAtual}/${this.anoAtual}`
  private _mesAnoSelected = {mes: this.mesAtual, ano: this.anoAtual}

  loadingPdf = false;
  isLoading = false;


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

  resetarValores(){
    this.fluxos = [];
    this.saldoAnterior = 0;
    this.somaEntradas = 0;
    this.somaSaidas = 0;
    this.saldoRestante = 0;
  }

  carregarFluxos(){
    this.isLoading = true;
    this.resetarValores();
    const mes = this.mesAnoSelected.mes;
    const ano = this.mesAnoSelected.ano;
    this.fluxoService.getByMonthYear(
      this.mesAnoSelected.mes, this.mesAnoSelected.ano).subscribe({
      next:(fluxos) => {
        this.fluxos = fluxos;
        this.atualizarSaldo();
        this.mesAnoAtual = `${mes}/${ano}`
        this.isLoading = false;
      },
      error:(error) => {
        console.error('Erro ao carregar fluxos:', error);
        this.isLoading = false;
      }
    });
  }

  carregarSaldoAnterior(){
    this.saldoAnteriorService.buscarSaldoAnterior(this.mesAnoSelected.mes, this.mesAnoSelected.ano)
    .subscribe({
      next:(response)=>{
        this.saldoAnterior = response.saldoAnterior;
      },
      error:(error)=>{
        console.log(error)
        this.saldoAnterior = 0;
      }
    })
  }

  gerarRelatorioMensal(){
    // monta objeto
    const mes = this.mesAnoSelected.mes.toString().padStart(2,"0");
    const ano = this.mesAnoSelected.ano.toString();
    const pdfName = `Relatório mensal CVM - ${mes}/${ano}.pdf`
    const relatorioData: IRelatorioMensal = {
      fluxos: this.fluxos,
      saldoAnterior: this.saldoAnterior,
      entradas: this.somaEntradas,
      saidas: this.somaSaidas,
      saldoRestante: this.saldoRestante,
      mesAno: `${mes}/${ano}`,
      pdfName: pdfName
    }
    // faz requisição
    this.loadingPdf = true;
    this.relatorioService.gerarRelatorio(relatorioData).subscribe({
      next:(pdfBlob)=>{
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfName;
        link.click();
        this.loadingPdf = false;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      },
      error:(error)=>{
        console.log(error)
      }
    })
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
      console.log(fluxo)
        this.fluxoService.create(fluxo).subscribe(response =>{
          // this.fluxos = [response, ...this.fluxos]
          console.log(response)
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

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result || result === 0){
        const valorFormatado = result;
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
      }
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
