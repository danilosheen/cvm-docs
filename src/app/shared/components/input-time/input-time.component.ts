import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input-time',
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule, ReactiveFormsModule, NgIf],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './input-time.component.html',
  styleUrl: './input-time.component.css'
})
export class InputTimeComponent implements OnInit{

  @Input() label = '';
  @Input() defaultValue = '';
  @Output() inputTime = new EventEmitter();

  readonly input: FormControl<Date | null>;
  errorMessage: WritableSignal<string> = signal('');

  constructor() {
    const initialValue = new Date();
    initialValue.setHours(6, 30, 0, 0);
    this.input = new FormControl(initialValue);
    this.input.valueChanges.subscribe(() => this.updateErrorMessage());
    this.input.valueChanges.subscribe(() => this.sendDataSaidaInputHandler());
  }

  ngOnInit() {
    if(this.defaultValue){
      const initialValue = new Date();
      const horas = parseFloat(this.defaultValue.slice(0, 2));
      const minutos = parseFloat(this.defaultValue.slice(3, 5));
      initialValue.setHours(horas, minutos, 0, 0)
      this.input.setValue(initialValue);
      this.inputTime.emit({value: this.defaultValue, valid: this.input.valid});
    }
  }

  updateErrorMessage() {
    if (this.input.hasError('required')) {
      this.errorMessage.set('Este campo não pode ser vazio.');
    } else {
      this.errorMessage.set('Preencha o campo corretamente.');
    }
  }

  sendDataSaidaInputHandler(){

    const horaSaida = this.input.value;

    if (horaSaida) {
      // Formata a data para hh:mm
      const horas = String(horaSaida.getHours()).padStart(2, "0");
      const minutos = String(horaSaida.getMinutes()).padStart(2, "0");
      const horaFormatada = `${horas}:${minutos}`;

      this.inputTime.emit({value: horaFormatada, valid: this.input.valid});
    } else {
      console.error("Valor de horaSaida é nulo");
      this.inputTime.emit("");
    }
  }
}
