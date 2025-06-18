import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MY_FORMATS } from './formats';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, NgIf],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent {
  @Input() label = '';
  @Input() optional = false;
  @Input() defaultValue = '';
  @Output() inputDate = new EventEmitter();

  input: FormControl = new FormControl('');
  errorMessage: WritableSignal<string> = signal('');

  constructor() {
    this.input.valueChanges.subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if (!this.optional) {
      this.input.setValidators([Validators.required]);
    }

    if(this.defaultValue){
      this.input.setValue(this.defaultValue);
      this.sendDataSaidaInputHandler();
    }
  }

  updateErrorMessage() {
    if (this.input.hasError('required')) {
      this.errorMessage.set('Este campo não pode ser vazio.');
    } else {
      this.errorMessage.set('Preencha o campo corretamente.');
    }
  }

  onDatepickerClose(){
    if(this.input.value){
      this.sendDataSaidaInputHandler();
    }
  }

  sendDataSaidaInputHandler(){
    //envia output
    this.inputDate.emit({value: this.input.value, valid: this.input.valid});
  }
}
