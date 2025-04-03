import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { OrcamentoPDFService } from '../../core/services/orcamentoService/orcamento-pdf.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IOrcamento } from '../../interfaces/i-orcamento';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { InputSelectComponent } from "../../shared/components/input-select/input-select.component";
import { InputDateComponent } from "../../shared/components/input-date/input-date.component";
import { InputTimeComponent } from "../../shared/components/input-time/input-time.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";


@Component({
  selector: 'app-orcamento',
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    NgIf,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputTimeComponent,
    InputAutocompleteComponent
],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent{

  loading: boolean = false;
  errorMessage = signal('');
  orcamentoData: IOrcamento = {
    nomeCliente: '',
    telefoneContato: '',
    pacoteViagem: '',
    localSaida: '',
    dataSaida: '',
    horaSaida: '',
    dataRetorno: '',
    horaRetorno: '',
    valorComDespesa: '',
    valorSemDespesa: '',
    valorComNota: '',
    modeloVan: '',
    cortesiaKm: '',
    valorAcrescimoKm: '',
  };
  valid: boolean[] = [];
  cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];

  constructor(private pdfOrcamento: OrcamentoPDFService) {
    //inicializando o array de campos válidos
    for (let i = 0; i < 11; i++) {
      this.valid.push(false)
    }
  }

  onSubmit() {
    this.loading = true;

    this.pdfOrcamento.generatePDF(this.orcamentoData)
      .subscribe(
        (pdfBlob) => {
          const nomeClienteFormated = this.formatNomeCliente();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Orç. CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
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
      const nome = `${this.orcamentoData.nomeCliente.split(" ")[0]}`;
      const index = this.orcamentoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.orcamentoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
      const sobrenome = `${this.orcamentoData.nomeCliente.split(" ")[index]}`;
      const nomeClienteFormated = `${nome} ${sobrenome}`;
      return nomeClienteFormated
    } catch (error) {
      return `${this.orcamentoData.nomeCliente.split(" ")[0]}`;
    }
  }

  camposValidos(): boolean{
    for (let i of this.valid){
      if (i == false){
        return false
      }
    }
    return true
  }

  // Handler para os campos
  updateNomeClienteHandler(value: IInput) {
    this.orcamentoData.nomeCliente = value.value;
    this.valid[0] = (value.valid);
  }

  updateTelefoneContatoHandler(value: IInput) {
    this.orcamentoData.telefoneContato = value.value;
    this.valid[1] = (value.valid);
  }

  updatePacoteViagemHandler(value: IInput) {
    this.orcamentoData.pacoteViagem = value.value;
    this.valid[2] = (value.valid);
  }

  updateLocalSaidaHandler(value: IInput) {
    this.orcamentoData.localSaida = value.value;
    this.valid[3] = (value.valid);
  }

  updateDataSaidaHandler(value: IInput) {
    this.orcamentoData.dataSaida = value.value;
    this.valid[4] = (value.valid);
  }

  updateHoraSaidaHandler(value: IInput) {
    this.orcamentoData.horaSaida = value.value;
    this.valid[5] = (value.valid);
  }

  updateDataRetornoHandler(value: IInput) {
    this.orcamentoData.dataRetorno = value.value;
    this.valid[6] = (value.valid);
  }

  updateHoraRetornoHandler(value: IInput) {
    this.orcamentoData.horaRetorno = value.value;
    this.valid[7] = (value.valid);
  }

  updateValorComDespezaHandler(value: IInput) {
    this.orcamentoData.valorComDespesa = value.value;
    this.valid[8] = (value.valid);
  }

  updateValorSemDespezaHandler(value: IInput) {
    this.orcamentoData.valorSemDespesa = value.value;
    this.valid[9] = (value.valid);
  }

  updateValorComNotaHandler(value: IInput) {
    this.orcamentoData.valorComNota = value.value;
    this.valid[10] = (value.valid);
  }

  updateModeloVanHandler(value: IInput) {
    this.orcamentoData.modeloVan = value.value;
  }

  updateCortesiaKmHandler(value: IInput){
    this.orcamentoData.cortesiaKm = value.value;
  }

  updateValorAcrescimoKmHandler(value: IInput) {
    this.orcamentoData.valorAcrescimoKm = value.value;
  }

}
