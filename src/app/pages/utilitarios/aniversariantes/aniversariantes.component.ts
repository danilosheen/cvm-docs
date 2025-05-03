import { AfterViewChecked, Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ClienteService } from '../../../core/services/clienteService/cliente.service';
import { ICliente } from '../../../interfaces/i-cliente';
import { LoadingBlueComponent } from "../../../shared/components/loading-blue/loading-blue.component";
import { InputSelectComponent } from "../../../shared/components/input-select/input-select.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../../shared/components/dialog-generic/dialog-generic.component';
import { EmailService } from '../../../core/services/emailService/email-service.service';

@Component({
  selector: 'app-aniversariantes',
  imports: [
    NavbarComponent,
    FooterComponent,
    LoadingBlueComponent,
    InputSelectComponent,
    NgClass,
    MatTooltipModule
  ],
  templateUrl: './aniversariantes.component.html',
  styleUrl: './aniversariantes.component.css'
})
export class AniversariantesComponent{

  dialog = inject(MatDialog);
  emailService = inject(EmailService)

  date = new Date();
  mesAtual: number = this.date.getMonth();
  mesSelected = this.mesAtual;
  clienteService = inject(ClienteService);
  clientes: ICliente[] = [];
  aniversariantesDoMes: ICliente[] = [];
  isLoading = false;
  meses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];


  constructor(){
    this.isLoading = true;
    this.clienteService.getAll().subscribe(clientes =>{
      this.clientes = clientes;
      this.atualizaAniversariantes();
      this.isLoading = false;
    })
  }

  atualizaAniversariantes(){
    if(this.clientes){
      this.clientes.forEach(cliente =>{
        if(cliente.dataNascimento){
          let mesAniversario = parseInt(cliente.dataNascimento.slice(3, 5)) - 1;
          if(mesAniversario == this.mesSelected){
            this.aniversariantesDoMes.push(cliente);
          }
        }
      })
    }
  }

  openEnviarEmailAniversario(nomeCliente: string, emailCliente: string){
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      data:{
        dialogTitle: 'Enviar mensagem ao aniversariante',
        dialogContent: 'Você deseja enviar uma mensagem de felicitações ao aniversariante?'
      }
    });

    dialogRef.afterClosed().subscribe(data =>{
      if(data){
        this.emailService.enviarEmailAniversario({
          nomeCliente: nomeCliente,
          destinatario: emailCliente,
          assunto: 'Feliz aniversário!!!'
        }).subscribe(result=>{
          console.log(result)
        })
      }
    })
  }

  // handlers
  updateSelectedMonth(value: IInput){
    if (value.value) {
      const mes = value.value;
      for(let i = 0; i< this.meses.length; i++){
        if(mes == this.meses[i]){
          this.mesSelected = i;
        }
      }
      this.aniversariantesDoMes = [];
      this.atualizaAniversariantes();
    }
  }
}
