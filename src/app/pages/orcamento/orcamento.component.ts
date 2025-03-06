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
    InputSelectComponent,
    InputDateComponent,
    InputTimeComponent
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
    valor: '',
    modeloVan: '',
    valorAcrescimoKm: '',
  };
  valid: boolean[] = [];
  cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];

  constructor(private pdfOrcamento: OrcamentoPDFService) {
    //inicializando o array de campos válidos
    for (let i = 0; i < 9; i++) {
      this.valid.push(false)
    }
  }

  onSubmit() {
    this.loading = true;

    this.pdfOrcamento.generatePDF(this.orcamentoData)
      .subscribe(
        (pdfBlob) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Orcamento CVM ${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
          link.click();
          this.loading = false;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        },
        (error) => {
          console.error('Erro ao gerar o PDF:', error);
          this.loading = false;
        }
      );
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

  updateValorHandler(value: IInput) {
    this.orcamentoData.valor = value.value;
    this.valid[8] = (value.valid);
  }

  updateModeloVanHandler(value: IInput) {
    this.orcamentoData.modeloVan = value.value;
  }

  updateValorAcrescimoKmHandler(value: IInput) {
    this.orcamentoData.valorAcrescimoKm = value.value;
  }

}
