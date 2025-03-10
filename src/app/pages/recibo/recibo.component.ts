import { Component, signal } from '@angular/core';
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
  ],
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.css'
})
export class ReciboComponent {

  loading: boolean = false;
  errorMessage = signal('');
  reciboData: IRecibo = {
    nomeCliente: '',
    pacoteViagem: '',
    valor: '',
  };
  valid: boolean[] = [];

  constructor(private pdfRecibo: ReciboPDFService) {
      //inicializando o array de campos válidos
      for (let i = 0; i < 3; i++) {
        this.valid.push(false)
      }
    }

  onSubmit() {
    this.loading = true;
    this.pdfRecibo.generatePDF(this.reciboData)
      .subscribe(
        (pdfBlob) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Recibo CVM ${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
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

}
