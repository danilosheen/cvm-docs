import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-input-select',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.css'
})
export class InputSelectComponent {

  @Input() errorMessage = '';
  @Input() listItens: string[] = [];
  @Input() label = '';
  @Output() selectedInputValue = new EventEmitter();

  inputControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];

  sendSelectedInputHandler(event: MatOptionSelectionChange, item: string) {
    if (event.isUserInput) {
      this.selectedInputValue.emit({value: item, valid: (item ? true : false)});
    }
  }
}
