import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputRadioComponent } from "../../shared/components/input-radio/input-radio.component";
import { IContrato } from '../../interfaces/i-contrato';
import { IInput } from '../../interfaces/i-handlerInput';
import { InputAutocompleteDataPessoaComponent } from "../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component";
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { ICliente } from '../../interfaces/i-cliente';
import { IPessoaAutocomplete } from '../../interfaces/i-clienteAutocomplete';
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputDateComponent } from "../../shared/components/input-date/input-date.component";
import { InputTimeComponent } from "../../shared/components/input-time/input-time.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { NgIf } from '@angular/common';
import { CotratoService } from '../../core/services/contratoService/cotrato.service';
import { Router } from '@angular/router';
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';
import { MatButtonModule } from '@angular/material/button';
import { ContratoHistoryService } from '../../core/services/contratoHistoryService/contrato-history.service';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";

@Component({
  selector: 'app-contrato',
  imports: [
    NavbarComponent,
    FooterComponent,
    InputRadioComponent,
    InputAutocompleteDataPessoaComponent,
    InputNumberComponent,
    InputTextComponent,
    InputDateComponent,
    InputTimeComponent,
    InputAutocompleteComponent,
    NgIf,
    MatButtonModule,
    LoadingBlueComponent
],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent implements OnInit{

  clienteService = inject(ClienteService);
  pdfContratoService = inject(CotratoService);
  clientes:ICliente[] = [];
  nomeClientes: IPessoaAutocomplete[] = [];
  contratoData: IContrato;
  documentosList: string[] = ['CPF', 'RG', 'CNPJ'];
  modalidadesContrato: string[] = ['NORMAL', 'POR KM'];
  locaisSaida: string[] = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
  valid: any[] = [];
  loading = false;
  isLoadingClientes = true;
  isLoadingContratoBehaviorSubject = true;

  // behavior subject contrato
    router = inject(Router);
    contratoBehaviorSubject = inject(BehaviorSubjectService);
    contratoHistoryService = inject(ContratoHistoryService);
    maxRetries = 3;
    retryDelay = 2000; // 2 segundos
    retryCount = 0;

  constructor(){

    for (let i = 0; i <= 18; i++) {
      this.valid.push({index: i, value: false});
    }

    // montagem do objeto
    this.contratoData = {
      tipoContrato: '',
      nomeCliente: '',
      documento: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      placaVeiculo: '',
      descricaoVeiculo: '',
      dataInicial: '',
      horaInicial: '',
      dataFinal: '',
      horaFinal: '',
      origem: '',
      destino: '',
      detalhesLocacao: {
        tipoContratoLocacao: 'NORMAL',
        valorTotal: null,
        kmTotal: null,
        valorKmExcedido: null,
        kmCortesia: null
      }
    }

    // preenche valores padrão
    this.updateTipoContratoHandler({value: 'CPF', valid: true});
    this.updatePlacaVeiculoHandler({value: 'OSQ1G19', valid: true});
    this.updateDescricaoVeiculoHandler({value: 'Van MiniBus Mercedes Sprinter 515', valid: true});
    this.updateTipoContratoLocacaoHandler({value: 'NORMAL', valid: true});
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(clientes => {
      this.clientes = clientes;
      for(let cliente of clientes){
        this.nomeClientes.push({nome: cliente.nome, id: cliente.id!});
      }
      this.isLoadingClientes = false;
    });

    // nav vindo do history
    this.contratoBehaviorSubject.contratoSelecionado$.subscribe(data => {
      if (data) {
        console.log(data)
        this.contratoData = data;
        this.isLoadingContratoBehaviorSubject = false;
      } else {
        this.isLoadingContratoBehaviorSubject = false;
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const date = new Date();
    const nomeClienteFormated = this.formatNomeCliente();
    const pdfName = `Contrato CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`
    this.tryGenerateContratoPdf(pdfName);
    this.createContratoHistory();
  }

  tryGenerateContratoPdf(pdfName: string) {
    this.pdfContratoService.generatePDF({ pdfData: this.contratoData, pdfName: pdfName })
      .subscribe(
        (pdfBlob) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = pdfName;
          link.click();
          this.loading = false;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        },

        (error) => {
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.warn(`Tentativa ${this.retryCount} falhou. Retentando em ${this.retryDelay}ms...`);
            setTimeout(() => this.tryGenerateContratoPdf(pdfName), this.retryDelay);
          } else {
            console.error('Erro ao gerar o PDF após múltiplas tentativas:', error);
            this.loading = false;
            this.retryCount = 0;
          }
        }
      );
  }

  createContratoHistory(){
    this.contratoHistoryService.createContratoHistory(this.contratoData).subscribe({
      next:(result)=>{
        console.log(result);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  formatNomeCliente(){
    try {
      const nome = `${this.contratoData.nomeCliente.split(" ")[0]}`;
      const index = this.contratoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.contratoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
      const sobrenome = `${this.contratoData.nomeCliente.split(" ")[index]}`;
      const nomeClienteFormated = `${nome} ${sobrenome}`;
      return nomeClienteFormated
    } catch (error) {
      return `${this.contratoData.nomeCliente.split(" ")[0]}`;
    }
  }

  camposValidos(): boolean{
    for (let i of this.valid){
      if (i.value == false){
        return false
      }
    }
    return true
  }

  // Handlers
  updateTipoContratoHandler(value: IInput<string>){
    this.updateDocumentoHandler({value: '', valid: false});
    this.contratoData.tipoContrato = value.value;
    this.valid[0].value = value.valid;
  }

  updateNomeClienteHandler(value: any) {
    const idSelected = value.value.id;
    if(idSelected){
      this.clientes.forEach(cliente =>{
        if(cliente.id == idSelected){
          this.contratoData.nomeCliente = cliente.nome;
          this.updateTipoContratoHandler({value: cliente.typeDocumentSelected, valid: true});
          this.updateDocumentoHandler({value: cliente.documento, valid: true});
          this.updateRuaHandler({value: cliente.rua || '', valid: true});
          this.updateNumeroHandler({value: cliente.numero || '', valid: true});
          this.updateBairroHandler({value: cliente.bairro || '', valid: true});
          this.updateCidadeHandler({value: cliente.cidade || '', valid: true});
          this.updateEstadoHandler({value: cliente.estado || '', valid: true});
          this.valid[1].value = true;
          return
        }
      })
    } else {
      this.contratoData.nomeCliente = value.value.nome;
      this.valid[1].value = value.valid;
    }
  }

  updateDocumentoHandler(value: IInput<string>){
    this.contratoData.documento = value.value;
    this.valid[2].value = value.valid;
  }

  updateRuaHandler(value: IInput<string>){
    this.contratoData.endereco.rua = value.value;
    this.valid[3].value = value.valid;
  }

  updateNumeroHandler(value: IInput<string>){
    this.contratoData.endereco.numero = value.value;
    this.valid[4].value = value.valid;
  }

  updateBairroHandler(value: IInput<string>){
    this.contratoData.endereco.bairro = value.value;
    this.valid[5].value = value.valid;
  }

  updateCidadeHandler(value: IInput<string>){
    this.contratoData.endereco.cidade = value.value;
    this.valid[6].value = value.valid;
  }

  updateEstadoHandler(value: IInput<string>){
    this.contratoData.endereco.estado = value.value;
    this.valid[7].value = value.valid;
  }

  updatePlacaVeiculoHandler(value: IInput<string>){
    this.contratoData.placaVeiculo = value.value;
    this.valid[8].value = value.valid;
  }

  updateDescricaoVeiculoHandler(value: IInput<string>){
    this.contratoData.descricaoVeiculo = value.value;
    this.valid[9].value = value.valid;
  }

  updateDataInicialHandler(value: IInput<string>){
    this.contratoData.dataInicial = value.value;
    this.valid[10].value = value.valid;
  }

  updateHoraInicialHandler(value: IInput<string>){
    this.contratoData.horaInicial = value.value;
    this.valid[11].value = value.valid;
  }

  updateDataFinalHandler(value: IInput<string>){
    this.contratoData.dataFinal = value.value;
    this.valid[12].value = value.valid;
  }

  updateHoraFinalHandler(value: IInput<string>){
    this.contratoData.horaFinal = value.value;
    this.valid[13].value = value.valid;
  }

  updateOrigemHandler(value: IInput<string>){
    this.contratoData.origem = value.value;
    this.valid[14].value = value.valid;
  }

  updateDestinoHandler(value: IInput<string>){
    this.contratoData.destino = value.value;
    this.valid[15].value = value.valid;
  }

  updateTipoContratoLocacaoHandler(value: IInput<string>){
    this.contratoData.detalhesLocacao.tipoContratoLocacao = value.value;
    this.valid[16].value = value.valid;
  }

  updateValorTotalHandler(value: IInput<number>){
    this.contratoData.detalhesLocacao.valorTotal = value.value;
    this.valid[17].value = value.valid;
  }

  updateKmTotalHandler(value: IInput<number>){
    this.contratoData.detalhesLocacao.kmTotal = value.value;
    this.valid[18].value = value.valid;
  }

  updateValorKmExcedidoHandler(value: IInput<number>){
    this.contratoData.detalhesLocacao.valorKmExcedido = value.value;
  }

  updateKmCortesiaHandler(value: IInput<number>){
    this.contratoData.detalhesLocacao.kmCortesia = value.value;
  }

}
