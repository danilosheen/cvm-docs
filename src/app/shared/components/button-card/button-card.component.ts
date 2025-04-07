import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-card',
  imports: [],
  templateUrl: './button-card.component.html',
  styleUrl: './button-card.component.css'
})
export class ButtonCardComponent {

  @Input() icon = 'https://www.flaticon.com/br/icones-gratis/custo';
  @Input() title = 'Criar orçamento';
  @Input() description = 'Preencha os campos e gere um arquivo PDF no modelo da CVM Turismo.';
  @Output() buttonClicked = new EventEmitter();


  clickHandler(){
    this.buttonClicked.emit()
  }
}
