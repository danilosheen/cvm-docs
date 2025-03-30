import { Component, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FichaExcursaoService } from '../../core/services/fichaExcursaoService/ficha-excursao.service';
import { IInput } from '../../interfaces/i-handlerInput';
import { IFichaExcursao } from '../../interfaces/i-fichaExcursao'
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { InputDateComponent } from "../../shared/components/input-date/input-date.component";
import { InputTimeComponent } from "../../shared/components/input-time/input-time.component";
import { NgIf } from '@angular/common';
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { MatButtonModule } from '@angular/material/button';
import { InputCheckboxComponent } from "../../shared/components/input-checkbox/input-checkbox.component";
import { InputRadioComponent } from "../../shared/components/input-radio/input-radio.component";

@Component({
  selector: 'app-ficha-excursao',
  imports: [
    NavbarComponent,
    FooterComponent,
    NgIf,
    MatButtonModule,
    InputTextComponent,
    InputAutocompleteComponent,
    InputDateComponent,
    InputTimeComponent,
    InputNumberComponent,
    InputCheckboxComponent,
    InputRadioComponent
],
  templateUrl: './ficha-excursao.component.html',
  styleUrl: './ficha-excursao.component.css'
})
export class FichaExcursaoComponent {

  loading: boolean = false;
  errorMessage = signal('');
  valid: boolean[] = [];
  cidades: string[] = ["Juazeiro do Norte", "Crato", "Barbalha"]
  hospedagens: string[] = ['Casa de praia', 'Pousada', 'Hotel'];

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
      cpf: '',
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
    entradaParcelamento: '',
    valorParcelas: '',
    qtdParcelas: '',
    dataPagamentoParcela: '',
    dependentes:[]
    };

  constructor(private pdfFichaExcursao: FichaExcursaoService) {
      //inicializando o array de campos válidos
      for (let i = 0; i <= 16; i++) {
        this.valid.push(false)
      }
    }

  onSubmit() {
      this.loading = true;
      this.pdfFichaExcursao.generatePDF(this.fichaExcursaoData)
        .subscribe(
          (pdfBlob) => {
            console.log(this.fichaExcursaoData)
            const nomeClienteFormated = this.formatNomeCliente();
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            const date = new Date();
            link.href = pdfUrl;
            link.download = `Ficha de Excursão CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
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
      console.log(this.valid)
      for (let i of this.valid){
        if (i == false){
          return false
        }
      }
      return true
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

    updateNomeClienteHandler(value: IInput) {
      this.fichaExcursaoData.cliente.nome = value.value;
      this.valid[6] = (value.valid);
    }

    updateDataNascimentoHandler(value: IInput) {
      this.fichaExcursaoData.cliente.dataNascimento = value.value;
    }

    updateContatoHandler(value: IInput) {
      this.fichaExcursaoData.cliente.contato = value.value;
      this.valid[7] = (value.valid);
    }

    updateCpfHandler(value: IInput) {
      this.fichaExcursaoData.cliente.cpf = value.value;
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
}
