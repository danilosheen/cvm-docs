import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InputRadioComponent } from "../../shared/components/input-radio/input-radio.component";
import { BrCurrencyPipe } from "../../pipes/br-currency.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import html2canvas from 'html2canvas';
import { ViagemSettingsService } from '../../core/services/viagemSettingsService/viagem-settings.service';
import { ViagemSettings } from '../../interfaces/i-viagemSettings';

@Component({
  selector: 'app-calculadora',
  imports: [
    NavbarComponent,
    FooterComponent,
    InputNumberComponent,
    NgIf,
    MatButtonModule,
    InputRadioComponent,
    BrCurrencyPipe,
    MatIconModule,
    MatDividerModule,
    MatIconModule
],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

  @ViewChild('captureDiv') captureDiv!: ElementRef;

  settingsService = inject(ViagemSettingsService);
  settingsViagem: ViagemSettings;
  loadingShare = false;

  valid: boolean[] = [];
  loading = false;
  buttonCopy = false;

  constructor(){

    for(let i = 0; i < 4; i++){
      this.valid[i] = false;
    }
    this.settingsViagem = this.settingsService.load();
  }

  calcularViagem(){
    this.loading = true;
    this.settingsViagem.combustivelNecessario = this.calcularCombustivelNecessario(
      this.settingsViagem.distanciaKM || 0,
      this.settingsViagem.autonomiaVeiculo || 0
    );
    this.settingsViagem.custoTotalCombustivel = this.calcularCustoTotalCombustivel(
      this.settingsViagem.combustivelNecessario || 0,
      this.settingsViagem.precoCombustivel || 0
    )

    this.settingsViagem.valorDesgasteDoVeiculo =
      this.settingsViagem.custoTotalCombustivel *
      (this.settingsViagem.desgasteDoVeiculo/100);

    //percorre o array e retorna o somatório acumulado dos valores
    this.settingsViagem.somatorioHospedagens = this.settingsViagem.valoresHospedagem.reduce((total, hospedagem) => total + hospedagem, 0);
    this.settingsViagem.somatorioRefeicoes = this.settingsViagem.valoresRefeicao.reduce((total, refeicao) => total + refeicao, 0);
    this.settingsViagem.somatorioPedagios = this.settingsViagem.valoresPedagio.reduce((total, pedagio) => total + pedagio, 0);
    this.settingsViagem.somatorioDiariasMotorista = this.settingsViagem.valorDiariaMotorista * this.settingsViagem.diasDeViagem;

    this.settingsViagem.custoTotalDespesa =
      this.settingsViagem.custoTotalCombustivel +
      this.settingsViagem.valorDesgasteDoVeiculo +
      this.settingsViagem.somatorioHospedagens +
      this.settingsViagem.somatorioRefeicoes +
      this.settingsViagem.somatorioPedagios +
      this.settingsViagem.somatorioDiariasMotorista;

    // Somatório com despesa
    this.settingsViagem.valorMargemDeLucro = this.settingsViagem.custoTotalDespesa * (this.settingsViagem.margemDeLucro/100);
    this.settingsViagem.custoTotalViagemComDespesa = this.settingsViagem.custoTotalDespesa + this.settingsViagem.valorMargemDeLucro;
    this.settingsViagem.valorPorKm = this.settingsViagem.custoTotalViagemComDespesa / this.settingsViagem.distanciaKM;

    // Custo total sem despesa
    this.settingsViagem.custoTotalViagemSemDespesa =
      this.settingsViagem.custoTotalViagemComDespesa -
      this.settingsViagem.somatorioHospedagens -
      this.settingsViagem.somatorioRefeicoes;

    // Custo total com nota
    this.settingsViagem.custoTotalViagemComNota =
      this.settingsViagem.custoTotalViagemComDespesa * 1.10;

    // salva no localStorage
    this.settingsService.save(this.settingsViagem);
    this.loading = false;
    console.log(this.settingsViagem.valoresHospedagem)
  }

  camposPreenchidos(): boolean {
    // console.log(this.valid)
    return this.valid.every(element => element === true);
  }

  calcularCombustivelNecessario(distanciaKM: number, autonomiaVeiculo: number): number{
    return (distanciaKM / autonomiaVeiculo);
  }

  calcularCustoTotalCombustivel(combustivelNecessario: number, precoCombustivel: number){
    return (combustivelNecessario * precoCombustivel);
  }

  adicionarValorLista(lista: number[], valor : number, index: number){
    lista[index] = valor;
  }

  removerValorLista(lista: number[], index: number){
    lista.splice(index, 1);
  }

  addDiaHospedagem(){
    this.settingsViagem.contadorHospedagens++
  }

  removerDiaHospedagem(){
    if(this.settingsViagem.contadorHospedagens > 1){
      this.settingsViagem.contadorHospedagens--
      this.settingsViagem.valoresHospedagem.pop();
    }
  }

  addDiaRefeicao(){
    this.settingsViagem.contadorRefeicoes++
  }

  removerDiarefeicao(){
    if(this.settingsViagem.contadorRefeicoes > 1){
      this.settingsViagem.contadorRefeicoes--
      this.settingsViagem.valoresRefeicao.pop();
    }
  }

  captureAndShare() {
    this.loadingShare = true;

    html2canvas(this.captureDiv.nativeElement).then(canvas => {
      const desiredWidth = 2000;
      const scale = desiredWidth / canvas.width;
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = desiredWidth;
      scaledCanvas.height = canvas.height * scale;

      const ctx = scaledCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
        scaledCanvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], 'cálculo_viagem.png', { type: 'image/png' });
            this.shareImage(file);
          }
        });
      }
      this.loadingShare = false;
    });
  }

  async shareImage(file: File) {
    if (navigator.share) {
      try {
        await navigator.share({
          files: [file],
          title: 'Calculadora',
          text: 'Cálculo de viagem CVM',
        });
        console.log('Compartilhamento realizado!');
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback: download do arquivo
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name || "cálculo_viagem.png";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  copiarTotaisToClipboard(){
    const totais = `${this.settingsViagem.custoTotalViagemSemDespesa}\t${this.settingsViagem.custoTotalViagemComDespesa}\t${this.settingsViagem.custoTotalViagemComNota}`

      navigator.clipboard.writeText(totais).then(()=>{
        this.buttonCopy = true;
        console.log("Copiado para a área de transferência!");
      }).catch(err => {
        this.buttonCopy = false;
        console.error("Erro ao copiar:", err);
      });

  }



  // handlers
  updatePrecoCombustivelHandler(value: IInput<number>){
    this.settingsViagem.precoCombustivel = value.value;
    this.valid[0] = value.valid;
  }

  updateDistanciaEmKmHandler(value: IInput<number>){
    this.settingsViagem.distanciaKM = value.value;
    this.valid[1] = value.valid;
  }

  updateAutonomiaDoVeiculoHandler(value: IInput<number>){
    this.settingsViagem.autonomiaVeiculo = value.value;
    this.valid[2] = value.valid;
  }

  updateDesgasteDoVeiculoHandler(value: IInput<number>){
    this.settingsViagem.desgasteDoVeiculo = value.value;
    this.valid[3] = value.valid;
  }

  updateDiasDeViagemHandler(value: IInput<number>){
    this.settingsViagem.diasDeViagem = value.value;
  }

  updateRadioHospedagemSelectedHandler(value: IInput<string>){
    this.settingsViagem.valoresHospedagem = [];
    value.value == 'Sim' ? this.settingsViagem.contadorHospedagens = 1 : 0;
    this.settingsViagem.hospedagemOptionSelected = value.value;
  }

  updateRadioRefeicaoSelectedHandler(value: IInput<string>){
    this.settingsViagem.valoresRefeicao = [];
    value.value == 'Sim' ? this.settingsViagem.contadorRefeicoes = 1 : 0;
    this.settingsViagem.refeicaoOptionSelected = value.value;
  }

  updateRadioPedagioSelectedHandler(value: IInput<string>){
    this.settingsViagem.valoresPedagio = [];
    this.settingsViagem.quantidadePedagios = 0;
    this.settingsViagem.pedagioOptionSelected = value.value;
  }

  updateQuantidadePedagiosHandler(value: IInput<number>){
    this.settingsViagem.quantidadePedagios = value.value;
  }

  updateRadioMotoristaSelectedHandler(value: IInput<string>){
    this.settingsViagem.motoristaOptionSelected = value.value;
  }

  updateValorDiariaMotoristaHandler(value: IInput<number>){
    this.settingsViagem.valorDiariaMotorista = 0;
    this.settingsViagem.valorDiariaMotorista = value.value;
  }

  updateMargemDeLucroHandler(value: IInput<number>){
    this.settingsViagem.margemDeLucro = value.value
  }
}
