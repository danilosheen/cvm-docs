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

  // readonly input = new FormControl('', { validators: [Validators.required], nonNullable: true });
  errorMessage: WritableSignal<string> = signal('');

  constructor() {
    this.input.valueChanges.subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if (!this.optional) {
      this.input.setValidators([Validators.required]);
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
    this.sendDataSaidaInputHandler();
  }

  sendDataSaidaInputHandler(){
    //envia output
    const dataSaida = new Date(this.input.value);

    // Formata a data para dd/mm/yyyy
    const dia = String(dataSaida.getDate()).padStart(2, "0");
    const mes = String(dataSaida.getMonth() + 1).padStart(2, "0"); // Meses começam do 0
    const ano = dataSaida.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    this.inputDate.emit({value: dataFormatada, valid: this.input.valid});
  }
}
