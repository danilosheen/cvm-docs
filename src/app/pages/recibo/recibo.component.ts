import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { ReciboPDFService } from '../../core/services/reciboService/recibo-pdf.service';
import { IRecibo } from '../../interfaces/i-recibo';
import { IInput } from '../../interfaces/i-handlerInput';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InputSelectComponent } from "../../shared/components/input-select/input-select.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { ClienteService } from '../../core/services/clienteService/cliente.service';

@Component({
  selector: 'app-recibo',
  imports: [
    NavbarComponent,
    FooterComponent,
    InputTextComponent,
    InputNumberComponent,
    NgIf,
    MatButtonModule,
    FormsModule,
    InputSelectComponent,
    InputAutocompleteComponent
],
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.css'
})
export class ReciboComponent implements OnInit {

  loading: boolean = false;
  errorMessage = signal('');
  reciboData: IRecibo = {
    nomeCliente: '',
    pacoteViagem: '',
    valor: '',
    formaPagamento: '',
  };
  valid: boolean[] = [];
  formasPagamento = ["Pix", "Dinheiro", "Cartão de crédito"];
  nomeCLientes: string[] = [];
  clienteService = inject(ClienteService);

  constructor(private pdfRecibo: ReciboPDFService) {
    //inicializando o array de campos válidos
    for (let i = 0; i < 4; i++) {
      this.valid.push(false)
    }
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(clientes =>{
      for(let cliente of clientes){
        this.nomeCLientes.push(cliente.nome);
      }
    })
  }

  onSubmit() {
    this.loading = true;
    this.pdfRecibo.generatePDF(this.reciboData)
      .subscribe(
        (pdfBlob) => {
          const nomeClienteFormated = this.formatNomeCliente();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Recibo CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf.pdf`;
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
      const nome = `${this.reciboData.nomeCliente.split(" ")[0]}`;
      const index = this.reciboData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.reciboData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
      const sobrenome = `${this.reciboData.nomeCliente.split(" ")[index]}`;
      const nomeClienteFormated = `${nome} ${sobrenome}`;
      return nomeClienteFormated
    } catch (error) {
      return `${this.reciboData.nomeCliente.split(" ")[0]}`;
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

  updateNomeClienteHandler(value: IInput) {
      this.reciboData.nomeCliente = value.value;
      this.valid[0] = (value.valid);
  }

  updatePacoteViagemHandler(value: IInput) {
    this.reciboData.pacoteViagem = value.value;
    this.valid[1] = (value.valid);
  }

  updateValorHandler(value: IInput) {
    this.reciboData.valor = value.value;
    this.valid[2] = (value.valid);
  }

  updateFormaPagamentoHandler(value: IInput) {
    this.reciboData.formaPagamento = value.value;
    this.valid[3] = (value.valid);
  }

}
