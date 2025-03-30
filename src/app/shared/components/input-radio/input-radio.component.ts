import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-input-radio',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css'
})
export class InputRadioComponent {

  @Input() label = '';
  @Input() listItems: string[] = [];
  @Output() selectedValue = new EventEmitter();

  tipoHospedagem: string = '';

  onSelectionChange(item: string){
    console.log(item)
    if(item){
      this.selectedValue.emit({value: item, valid: true})
    }
  }
}
