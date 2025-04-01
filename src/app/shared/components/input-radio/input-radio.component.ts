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
  @Input() defaultValue: string = '';
  @Input() expanded: boolean = false;
  @Input() dropdown: boolean = true;
  @Output() selectedValue = new EventEmitter();

  onSelectionChange(item: string){
    if(item){
      this.selectedValue.emit({value: item, valid: true})
    }
  }
}
