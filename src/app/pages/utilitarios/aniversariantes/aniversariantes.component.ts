import { AfterViewChecked, Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ClienteService } from '../../../core/services/clienteService/cliente.service';
import { ICliente } from '../../../interfaces/i-cliente';
import { LoadingBlueComponent } from "../../../shared/components/loading-blue/loading-blue.component";
import { InputSelectComponent } from "../../../shared/components/input-select/input-select.component";
import { IInput } from '../../../interfaces/i-handlerInput';

@Component({
  selector: 'app-aniversariantes',
  imports: [NavbarComponent, FooterComponent, LoadingBlueComponent, InputSelectComponent],
  templateUrl: './aniversariantes.component.html',
  styleUrl: './aniversariantes.component.css'
})
export class AniversariantesComponent{

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
  ]


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
