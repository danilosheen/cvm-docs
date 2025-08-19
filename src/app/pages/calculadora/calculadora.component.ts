import { Component } from '@angular/core';
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
    MatButtonModule,
    MatDividerModule,
    MatIconModule
],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

  precoCombustivel: number = 0;
  distanciaKM: number = 0;
  autonomiaVeiculo: number = 0;
  combustivelNecessario: number = 0;
  custoTotalCombustivel: number = 0;
  desgasteDoVeiculo: number = 30;
  valorDesgasteDoVeiculo: number = 0;
  valoresHospedagem: number[] = [];
  valoresRefeicao: number[] = [];
  valoresPedagio: number[] = [];
  valorDiariaMotorista: number = 0;
  valorPorKm: number = 0;
  somatorioHospedagens: number = 0;
  somatorioRefeicoes: number = 0;
  somatorioPedagios: number = 0;
  somatorioDiariasMotorista: number = 0;
  diasDeViagem: number = 0;
  contadorHospedagens: number = 0;
  contadorRefeicoes: number = 0;
  quantidadePedagios: number = 0;
  margemDeLucro: number = 75;
  valorMargemDeLucro: number = 0;
  custoTotalDespesa: number = 0;
  custoTotalViagem: number = 0;
  optionsRadio: string[] = ['Sim', 'Não'];

  hospedagemOptionSelected: string = 'Não';
  refeicaoOptionSelected: string = 'Não';
  pedagioOptionSelected: string = 'Não';
  motoristaOptionSelected: string = 'Não';

  valid: boolean[] = [];
  loading = false;

  constructor(){

    for(let i = 0; i < 4; i++){
      this.valid[i] = false;
    }
  }

  calcularViagem(){
    this.loading = true;
    this.combustivelNecessario = this.calcularCombustivelNecessario(
      this.distanciaKM || 0,
      this.autonomiaVeiculo || 0
    );
    this.custoTotalCombustivel = this.calcularCustoTotalCombustivel(
      this.combustivelNecessario || 0,
      this.precoCombustivel || 0
    )

    this.valorDesgasteDoVeiculo = this.custoTotalCombustivel * (this.desgasteDoVeiculo/100);

    //percorre o array e retorna o somatório acumulado dos valores
    this.somatorioHospedagens = this.valoresHospedagem.reduce((total, hospedagem) => total + hospedagem, 0);
    this.somatorioRefeicoes = this.valoresRefeicao.reduce((total, refeicao) => total + refeicao, 0);
    this.somatorioPedagios = this.valoresPedagio.reduce((total, pedagio) => total + pedagio, 0);
    this.somatorioDiariasMotorista = this.valorDiariaMotorista * this.diasDeViagem;

    this.custoTotalDespesa =
      this.custoTotalCombustivel +
      this.valorDesgasteDoVeiculo +
      this.somatorioHospedagens +
      this.somatorioRefeicoes +
      this.somatorioPedagios +
      this.somatorioDiariasMotorista;

    this.valorMargemDeLucro = this.custoTotalDespesa * (this.margemDeLucro/100);
    this.custoTotalViagem = this.custoTotalDespesa + this.valorMargemDeLucro;
    this.valorPorKm = this.custoTotalViagem / this.distanciaKM;

    this.loading = false;
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
    this.contadorHospedagens++
  }

  removerDiaHospedagem(){
    if(this.contadorHospedagens > 1){
      this.contadorHospedagens--
    }
  }

  addDiaRefeicao(){
    this.contadorRefeicoes++
  }

  removerDiarefeicao(){
    if(this.contadorRefeicoes > 1){
      this.contadorRefeicoes--
    }
  }

  updatePrecoCombustivelHandler(value: IInput<number>){
    this.precoCombustivel = value.value;
    this.valid[0] = value.valid;
  }

  updateDistanciaEmKmHandler(value: IInput<number>){
    this.distanciaKM = value.value;
    this.valid[1] = value.valid;
  }

  updateAutonomiaDoVeiculoHandler(value: IInput<number>){
    this.autonomiaVeiculo = value.value;
    this.valid[2] = value.valid;
  }

  updateDesgasteDoVeiculoHandler(value: IInput<number>){
    this.desgasteDoVeiculo = value.value;
    this.valid[3] = value.valid;
  }

  updateDiasDeViagemHandler(value: IInput<number>){
    this.diasDeViagem = value.value;
  }

  updateRadioHospedagemSelectedHandler(value: IInput<string>){
    this.valoresHospedagem = [];
    value.value == 'Sim' ? this.contadorHospedagens = 1 : 0;
    this.hospedagemOptionSelected = value.value;
  }

  updateRadioRefeicaoSelectedHandler(value: IInput<string>){
    this.valoresRefeicao = [];
    value.value == 'Sim' ? this.contadorRefeicoes = 1 : 0;
    this.refeicaoOptionSelected = value.value;
  }

  updateRadioPedagioSelectedHandler(value: IInput<string>){
    this.valoresPedagio = [];
    this.pedagioOptionSelected = value.value;
  }

  updateQuantidadePedagiosHandler(value: IInput<number>){
    this.quantidadePedagios = value.value;
  }

  updateRadioMotoristaSelectedHandler(value: IInput<string>){
    this.motoristaOptionSelected = value.value;
  }

  updateValorDiariaMotoristaHandler(value: IInput<number>){
    this.valorDiariaMotorista = 0;
    this.valorDiariaMotorista = value.value;
  }

  updateMargemDeLucroHandler(value: IInput<number>){
    this.margemDeLucro = value.value
  }
}
