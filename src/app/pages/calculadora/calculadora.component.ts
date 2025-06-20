import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { ICustoViagem } from '../../interfaces/i-custos-viagem';

@Component({
  selector: 'app-calculadora',
  imports: [NavbarComponent, FooterComponent, InputNumberComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

  // custosViagem: ICustoViagem;

  updatePrecoCombustivelHandler(value: IInput<number>){

  }

  updateDistanciaEmKmHandler(value: IInput<number>){

  }
}
