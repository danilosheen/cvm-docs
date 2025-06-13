import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { LoadingBlueComponent } from "../../../shared/components/loading-blue/loading-blue.component";
import { ClienteService } from '../../../core/services/clienteService/cliente.service';
import { InputAutocompleteComponent } from "../../../shared/components/input-autocomplete/input-autocomplete.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { NotaAgradecimentoService } from '../../../core/services/notaAgradecimentoService/nota-agradecimento.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InputAutocompleteDataPessoaComponent } from "../../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component";
import { IPessoaAutocomplete } from '../../../interfaces/i-clienteAutocomplete';
import { ICliente } from '../../../interfaces/i-cliente';
import { EmailService } from '../../../core/services/emailService/email-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nota-agradecimento',
  imports: [
    NavbarComponent,
    FooterComponent,
    LoadingBlueComponent,
    NgIf,
    MatButtonModule,
    InputAutocompleteDataPessoaComponent
],
  templateUrl: './nota-agradecimento.component.html',
  styleUrl: './nota-agradecimento.component.css'
})
export class NotaAgradecimentoComponent implements OnInit{

  loading = false;
  loadingEmail = false;
  isLoadingClientes = true;
  clienteService = inject(ClienteService);
  emailService = inject(EmailService);
  snackBar = inject(MatSnackBar);
  valid: boolean[] = [false];
  notaAgradecimentoService = inject(NotaAgradecimentoService);
  clientes: ICliente[] = [];
  nomeClientes: IPessoaAutocomplete[] = [];

  nomeCliente = '';
  idCliente: string = '';
  emailCliente: string = '';

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(clientes => {
      this.clientes = clientes;
      for(let cliente of this.clientes){
        this.nomeClientes.push({id: cliente.id!, nome: cliente.nome});
      }
      this.isLoadingClientes = false;
    })
  }

  onSubmit() {
    this.loading = true;
    const nomeClienteFormated = this.formatNomeCliente();
    const date = new Date();
    const pdfName = `Nota de Agradecimento CVM - ${nomeClienteFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`

    this.notaAgradecimentoService.generatePDF({nomeCliente: this.nomeCliente, pdfName: pdfName})
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

  enviarPorEmail(){
    this.loadingEmail = true;
    const data = {
      nomeCliente: this.nomeCliente,
      destinatario: this.emailCliente,
      assunto: "Nota de agradecimento"
    }
    this.emailService.enviarEmailNotaAgradecimento(data).subscribe({
      next: (response) => {
        this.loadingEmail = false;
        if (response?.message) {
          this.snackBar.open(response.message, 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            data:{}
          });
        }
      },
      error: (error) => {
        this.loadingEmail = false;
        this.snackBar.open('Erro ao enviar o e-mail.', 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        console.error(error);
      }
    });
  }

  hasEmail(){
    if(this.emailCliente && this.isValid()){
      return true;
    }
    return false;
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

  updateNomeClienteHandler(value: any){
    const pessoa = value?.value || value;
    this.nomeCliente = pessoa.nome;
    if (pessoa.id) {
      this.clientes.forEach(cliente => {
        if(cliente.id == pessoa.id){
          this.nomeCliente = cliente.nome;
          this.emailCliente = cliente.email || "";
        }
      });
    } else {
      this.emailCliente = '';
    }
    this.valid[0] = value.valid ?? true;
  }

}
