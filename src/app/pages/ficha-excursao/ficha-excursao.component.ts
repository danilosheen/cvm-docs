import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FichaExcursaoService } from '../../core/services/fichaExcursaoService/ficha-excursao.service';
import { IInput } from '../../interfaces/i-handlerInput';
import { IFichaExcursao } from '../../interfaces/i-fichaExcursao'
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { InputDateComponent } from "../../shared/components/input-date/input-date.component";
import { InputTimeComponent } from "../../shared/components/input-time/input-time.component";
import { NgFor, NgIf } from '@angular/common';
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputCheckboxComponent } from "../../shared/components/input-checkbox/input-checkbox.component";
import { InputRadioComponent } from "../../shared/components/input-radio/input-radio.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent, DialogFromMenu } from "../../shared/components/dialog/dialog.component";
import { IDependente } from '../../interfaces/i-dependente';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { ICliente } from '../../interfaces/i-cliente';
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { IPessoaAutocomplete } from '../../interfaces/i-clienteAutocomplete';
import { InputAutocompleteDataPessoaComponent } from "../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component";
import { Router } from '@angular/router';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";

@Component({
  selector: 'app-ficha-excursao',
  imports: [
    NavbarComponent,
    FooterComponent,
    NgIf,
    NgFor,
    MatIconModule,
    MatButtonModule,
    InputTextComponent,
    InputAutocompleteComponent,
    InputDateComponent,
    InputTimeComponent,
    InputNumberComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    DialogComponent,
    InputAutocompleteDataPessoaComponent,
    LoadingBlueComponent
],
  templateUrl: './ficha-excursao.component.html',
  styleUrl: './ficha-excursao.component.css'
})
export class FichaExcursaoComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  loading: boolean = false;
  isLoadingCliente = true;
  errorMessage = signal('');
  valid: boolean[] = [];
  showModalDependente: boolean = false;
  cidades: string[] = ["Juazeiro do Norte", "Crato", "Barbalha"];
  hospedagens: string[] = ['Casa de praia', 'Pousada', 'Hotel'];
  typesDocument: string[] = ['RG', 'CPF', 'Registro'];
  clienteService = inject(ClienteService);
  clientes: ICliente[] = [];
  nomesClientes: IPessoaAutocomplete[] = [];

  fichaExcursaoData: IFichaExcursao = {
    excursaoPara: '',
    localSaida: '',
    dataSaida: '',
    horaSaida: '',
    dataRetorno: '',
    horaRetorno: '',
    cliente: {
      nome:'',
      dataNascimento: '',
      contato: '',
      typeDocumentSelected: 'RG',
      documento: '',
      endereco: {
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
      }
    },
    servicos: [],
    tipoDeHospedagem: '',
    valorIntegralExcursao: '',
    entradaParcelamento: '0,00',
    valorParcelas: '',
    qtdParcelas: '',
    dataPagamentoParcela: '',
    dependentes: []
    };

  constructor(private pdfFichaExcursao: FichaExcursaoService, private router: Router) {
    //inicializando o array de campos válidos
    for (let i = 0; i <= 16; i++) {
      this.valid.push(false)
    }
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(result =>{
      this.clientes = result
      this.isLoadingCliente = false;
      this.loadClientListNames();
    });
  }

  onSubmit() {
      this.loading = true;
      if(!this.fichaExcursaoData.cliente.documento){
        this.fichaExcursaoData.cliente.documento = 'Não informado'
      }

      if(!this.fichaExcursaoData.cliente.dataNascimento){
        this.fichaExcursaoData.cliente.dataNascimento = 'Não informado'
      }

      this.pdfFichaExcursao.generatePDF(this.fichaExcursaoData)
        .subscribe(
          (pdfBlob) => {
            // this.clienteService.saveClient(this.filtraDados(this.fichaExcursaoData), this.clientes);
            // this.clientes = this.clienteService.getAllClients();
            const nomeClienteFormated = this.formatNomeCliente();
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            const date = new Date();
            link.href = pdfUrl;
            link.download = `Ficha de Excursão CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
            link.click();
            this.loading = false;
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          },
          (error) => {
            try{
              setTimeout(()=>{
                this.onSubmit();
              }, 1000);
            } catch {
              console.error('Erro ao gerar o PDF:', error);
              this.loading = false;
            }
          }
        );
    }

    loadClientListNames(){
      if(this.clientes){
        for(let cliente of this.clientes){
          this.nomesClientes.push({nome: cliente.nome, id: cliente.id!});
        }
      }
    }

    filtraDados(dadosFichaExcursao: IFichaExcursao){
      return {
        nome: dadosFichaExcursao.cliente.nome,
        dataNascimento: dadosFichaExcursao.cliente.dataNascimento,
        contato: dadosFichaExcursao.cliente.contato,
        typeDocumentSelected: dadosFichaExcursao.cliente.typeDocumentSelected,
        documento: dadosFichaExcursao.cliente.documento,
        cidade: dadosFichaExcursao.cliente.endereco.cidade,
        bairro: dadosFichaExcursao.cliente.endereco.bairro,
        rua: dadosFichaExcursao.cliente.endereco.rua,
        numero: dadosFichaExcursao.cliente.endereco.numero,
      }
    }

    formatNomeCliente(){
      try {
        const nome = `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
        const index = this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "de" || this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
        const sobrenome = `${this.fichaExcursaoData.cliente.nome.split(" ")[index]}`;
        const nomeClienteFormated = `${nome} ${sobrenome}`;
        return nomeClienteFormated
      } catch (error) {
        return `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
      }
    }

    camposValidos(): boolean{
      if(this.fichaExcursaoData.valorIntegralExcursao && this.fichaExcursaoData.qtdParcelas){
        this.atualizaValorParcela(this.fichaExcursaoData.valorIntegralExcursao, this.fichaExcursaoData.qtdParcelas, this.fichaExcursaoData.entradaParcelamento);
      }

      for (let i of this.valid){
        if (i == false){
          return false
        }
      }
      return true
    }

    atualizaValorParcela(valorIntegral: string, qtdParcelas: string, entrada: string) {
      const valorIntegralLimpo = valorIntegral.replace(/\./g, '').replace(',', '.');
      const valorEntradalLimpo = entrada.replace(/\./g, '').replace(',', '.');
      const intValorIntegral = parseFloat(valorIntegralLimpo);
      const intValorEntrada = parseFloat(valorEntradalLimpo) || 0;
      const intQtdParcelas = parseFloat(qtdParcelas);
      const valorParcela = (intValorIntegral - intValorEntrada) / intQtdParcelas;
      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valorParcela);

      this.fichaExcursaoData.valorParcelas = valorFormatado;
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, i: number): void {
      const dialogRef = this.dialog.open(DialogGenericComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          dialogTitle: 'Remover dependente',
          dialogContent: 'Você tem certeza que deseja remover o dependente?',
        }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.fichaExcursaoData.dependentes.splice(i, 1);
        }
      });
    }

    toggleModalDependente(){
      this.showModalDependente = !this.showModalDependente
    }

    updateExcursaoParaHandler(value: IInput) {
          this.fichaExcursaoData.excursaoPara = value.value.toUpperCase();
          this.valid[0] = (value.valid);
    }

    updateLocalSaidaHandler(value: IInput) {
      this.fichaExcursaoData.localSaida = value.value;
      this.valid[1] = (value.valid);
    }

    updateDataSaidaHandler(value: IInput) {
      this.fichaExcursaoData.dataSaida = value.value;
      this.valid[2] = (value.valid);
    }

    updateHoraSaidaHandler(value: IInput) {
      this.fichaExcursaoData.horaSaida = value.value;
      this.valid[3] = (value.valid);
    }

    updateDataRetornoHandler(value: IInput) {
      this.fichaExcursaoData.dataRetorno = value.value;
      this.valid[4] = (value.valid);
    }

    updateHoraRetornoHandler(value: IInput) {
      this.fichaExcursaoData.horaRetorno = value.value;
      this.valid[5] = (value.valid);
    }

    updateNomeClienteHandler(value: any) {
      const idSelected = value.id;
      if(idSelected){
        this.fichaExcursaoData.cliente.nome = value.nome;
        this.clientes.forEach(element => {
          if(idSelected == element.id){
            this.fichaExcursaoData.cliente.id = element.id;
            this.updateDataNascimentoHandler({ value: element.dataNascimento!, valid: true});
            this.updateContatoHandler({ value: element.contato!, valid: true});
            this.updateTypeDocumentSelectedHandler({ value: element.typeDocumentSelected || '', valid: true});
            this.updateDocumentHandler({ value: element.documento || '', valid: true});
            this.updateCidadeHandler({ value: element.cidade!, valid: true});
            this.updateBairroHandler({ value: element.bairro!, valid: true});
            this.updateRuaHandler({ value: element.rua!, valid: true});
            this.updateNumeroCasaHandler({ value: element.numero!, valid: true});
          }
        });
      } else {
        this.fichaExcursaoData.cliente.nome = value.value.nome;
      }
      this.valid[6] = (value.valid);
    }

    updateDataNascimentoHandler(value: IInput) {
      if(value.value != 'NaN/NaN/NaN'){
        this.fichaExcursaoData.cliente.dataNascimento = value.value;
      }
    }

    updateContatoHandler(value: IInput) {
      this.fichaExcursaoData.cliente.contato = value.value;
      this.valid[7] = (value.valid);
    }

    updateTypeDocumentSelectedHandler(value: IInput) {
      this.fichaExcursaoData.cliente.typeDocumentSelected = value.value;
    }

    updateDocumentHandler(value: IInput) {
      this.fichaExcursaoData.cliente.documento = value.value;
    }

    updateCidadeHandler(value: IInput) {
      this.fichaExcursaoData.cliente.endereco.cidade = value.value;
      this.valid[8] = (value.valid);
    }

    updateBairroHandler(value: IInput) {
      this.fichaExcursaoData.cliente.endereco.bairro = value.value;
      this.valid[9] = (value.valid);
    }

    updateRuaHandler(value: IInput) {
      this.fichaExcursaoData.cliente.endereco.rua = value.value;
      this.valid[10] = (value.valid);
    }

    updateNumeroCasaHandler(value: IInput) {
      this.fichaExcursaoData.cliente.endereco.numero = value.value;
      this.valid[11] = (value.valid);
    }

    updateServicosSelecionadosHandler(value: string[]) {
      let services = {
        cafeDaManha: 'Café da manhã',
        almoco: 'Almoço',
        jantar: 'Jantar',
        roteiro: 'Roteiro'
      } as Record<string, string>;

      let servicosFormatados = value.map(item => services[item] || item);
      this.fichaExcursaoData.servicos = servicosFormatados;
      this.valid[12] = !!value.length;
    }

    updateTipoHospedagemHandler(value: IInput) {
      this.fichaExcursaoData.tipoDeHospedagem = value.value;
      this.valid[13] = (value.valid);
    }

    updateValorTotalExcursaoHandler(value: IInput) {
      this.fichaExcursaoData.valorIntegralExcursao = value.value;
      this.valid[14] = (value.valid);
    }

    updateEntradaParcelamentoHandler(value: IInput) {
      this.fichaExcursaoData.entradaParcelamento = value.value;
    }

    updateQtdParcelasHandler(value: IInput) {
      this.fichaExcursaoData.qtdParcelas = value.value;
      this.valid[15] = (value.valid);
    }

    updateDataVencimentoHandler(value: IInput) {
      this.fichaExcursaoData.dataPagamentoParcela = value.value;
      this.valid[16] = (value.valid);
    }
    updateDependentesHandler(value: IDependente){
      this.fichaExcursaoData.dependentes.push(value);
    }
}
