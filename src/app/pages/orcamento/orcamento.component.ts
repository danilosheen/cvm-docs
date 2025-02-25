import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { OrcamentoPDFService } from '../../core/services/orcamentoService/orcamentoPDF.service';
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
  cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
  // orcamentoForm: FormGroup<any> = new FormGroup({});


  constructor(private pdfOrcamento: OrcamentoPDFService) {}

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

  // Handler para os campos
  updateNomeClienteHandler(value: string) {
    this.orcamentoData.nomeCliente = value;
  }

  updateTelefoneContatoHandler(value: string) {
    this.orcamentoData.telefoneContato = value;
  }

  updatePacoteViagemHandler(value: string) {
    this.orcamentoData.pacoteViagem = value;
  }

  updateLocalSaidaHandler(value: string) {
    this.orcamentoData.localSaida = value;
  }

  updateDataSaidaHandler(value: string) {
    this.orcamentoData.dataSaida = value;
  }

  updateHoraSaidaHandler(value: string) {
    this.orcamentoData.horaSaida = value;
  }

  updateDataRetornoHandler(value: string) {
    this.orcamentoData.dataRetorno = value;
  }

  updateHoraRetornoHandler(value: string) {
    this.orcamentoData.horaRetorno = value;
  }

  updateValorHandler(value: string) {
    this.orcamentoData.valor = value;
  }

  updateModeloVanHandler(value: string) {
    this.orcamentoData.modeloVan = value;
  }

  updateValorAcrescimoKmHandler(value: string) {
    this.orcamentoData.valorAcrescimoKm = value;
  }

}
