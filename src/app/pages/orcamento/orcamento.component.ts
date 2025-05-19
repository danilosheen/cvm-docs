import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { ICliente } from '../../interfaces/i-cliente';
import { IPessoaAutocomplete } from '../../interfaces/i-clienteAutocomplete';
import { InputAutocompleteDataPessoaComponent } from "../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component";


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
    InputAutocompleteComponent,
    LoadingBlueComponent,
    InputAutocompleteDataPessoaComponent
],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent implements OnInit{

  loading: boolean = false;
  errorMessage = signal('');
  orcamentoData: IOrcamento = {
    nomeCliente: '',
    telefoneContato: '',
    localSaida: '',
    destinoViagem: '',
    dataSaida: '',
    horaSaida: '',
    dataRetorno: '',
    horaRetorno: '',
    valorComDespesa: null,
    valorSemDespesa: null,
    valorComNota: null,
    taxaPix: null,
    modeloVan: '',
    cortesiaKm: null,
    valorAcrescimoKm: null,
  };
  valid: boolean[] = [];
  cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
  clienteService = inject(ClienteService);
  clientes:ICliente[] = [];
  nomeClientes: IPessoaAutocomplete[] = [];
  isLoadingClientes = true;

  constructor(private pdfOrcamento: OrcamentoPDFService) {
    //inicializando o array de campos válidos
    for (let i = 0; i <= 11; i++) {
      this.valid.push(false)
    }
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(clientes =>{
      this.clientes = clientes;
      for(let cliente of clientes){
        this.nomeClientes.push({nome: cliente.nome, id: cliente.id!});
      }
      this.isLoadingClientes = false;
    });
  }

  onSubmit() {
    this.loading = true;
    const date = new Date();
    const nomeClienteFormated = this.formatNomeCliente();
    const pdfName = `Orç. CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`

    this.pdfOrcamento.generatePDF({pdfData: this.orcamentoData, pdfName: pdfName})
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
  updateNomeClienteHandler(value: any) {
    const idSelected = value.id;
    if(idSelected){
      this.clientes.forEach(cliente =>{
        if(cliente.id == idSelected){
          this.orcamentoData.nomeCliente = cliente.nome;
          this.updateTelefoneContatoHandler({value: cliente.contato, valid: true});
          this.valid[0] = true;
        }
      })
    } else {
      this.orcamentoData.nomeCliente = value.value.nome;
      this.valid[0] = value.valid;
    }
  }

  updateTelefoneContatoHandler(value: IInput<string>) {
    this.orcamentoData.telefoneContato = value.value;
    this.valid[1] = (value.valid);
  }

  updateLocalSaidaHandler(value: IInput<string>) {
    this.orcamentoData.localSaida = value.value;
    this.valid[3] = (value.valid);
  }

  updateDestinoViagemHandler(value: IInput<string>) {
    this.orcamentoData.destinoViagem = value.value;
    this.valid[2] = (value.valid);
  }

  updateDataSaidaHandler(value: IInput<string>) {
    this.orcamentoData.dataSaida = value.value;
    this.valid[4] = (value.valid);
  }

  updateHoraSaidaHandler(value: IInput<string>) {
    this.orcamentoData.horaSaida = value.value;
    this.valid[5] = (value.valid);
  }

  updateDataRetornoHandler(value: IInput<string>) {
    this.orcamentoData.dataRetorno = value.value;
    this.valid[6] = (value.valid);
  }

  updateHoraRetornoHandler(value: IInput<string>) {
    this.orcamentoData.horaRetorno = value.value;
    this.valid[7] = (value.valid);
  }

  updateValorComDespezaHandler(value: IInput<number>) {
    this.orcamentoData.valorComDespesa = value.value;
    this.valid[8] = (value.valid);
  }

  updateValorSemDespezaHandler(value: IInput<number>) {
    this.orcamentoData.valorSemDespesa = value.value;
    this.valid[9] = (value.valid);
  }

  updateValorComNotaHandler(value: IInput<number>) {
    this.orcamentoData.valorComNota = value.value;
    this.valid[10] = (value.valid);
  }

  updateTaxaPixHandler(value: IInput<number>){
    this.orcamentoData.taxaPix = value.value;
    this.valid[11] = (value.valid);
  }

  updateModeloVanHandler(value: IInput<string>) {
    this.orcamentoData.modeloVan = value.value;
  }

  updateCortesiaKmHandler(value: IInput<number>){
    this.orcamentoData.cortesiaKm = value.value;
  }

  updateValorAcrescimoKmHandler(value: IInput<number>) {
    this.orcamentoData.valorAcrescimoKm = value.value;
  }

}
