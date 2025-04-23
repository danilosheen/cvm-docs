import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { NotaAgradecimentoService } from '../../core/services/notaAgradecimentoService/nota-agradecimento.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nota-agradecimento',
  imports: [
    NavbarComponent,
    FooterComponent,
    LoadingBlueComponent,
    InputAutocompleteComponent,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './nota-agradecimento.component.html',
  styleUrl: './nota-agradecimento.component.css'
})
export class NotaAgradecimentoComponent implements OnInit{

  loading = false;
  isLoadingClientes = true;
  clienteService = inject(ClienteService);
  nomeCliente = '';
  nomeClientes: string[] = [];
  valid: boolean[] = [false];
  notaAgradecimentoService = inject(NotaAgradecimentoService);

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(clientes => {
      for(let cliente of clientes){
        this.nomeClientes.push(cliente.nome);
      }
      this.isLoadingClientes = false;
    })
  }

  onSubmit() {
    this.loading = true;

    this.notaAgradecimentoService.generatePDF(this.nomeCliente)
      .subscribe(
        (pdfBlob) => {
          const nomeClienteFormated = this.formatNomeCliente();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Nota de Agradecimento CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
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
      const nome = `${this.nomeCliente.split(" ")[0]}`;
      const index = this.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
      const sobrenome = `${this.nomeCliente.split(" ")[index]}`;
      const nomeClienteFormated = `${nome} ${sobrenome}`;
      return nomeClienteFormated
    } catch (error) {
      return `${this.nomeCliente.split(" ")[0]}`;
    }
  }

  isValid(): boolean{
    for(let item of this.valid){
      if(item == false){
        return false
      }
    }
    return true
  }

  updateNomeClienteHandler(value: IInput){
    this.nomeCliente = value.value;
    this.valid[0] = value.valid;
  }

}
