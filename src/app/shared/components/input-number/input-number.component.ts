import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-input-number',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() optional: boolean = false;
  @Output() inputValue = new EventEmitter<{ value: string, valid: boolean }>();

  errorMessage = signal('');
  input: FormControl;

  constructor() {
    this.input = new FormControl('');
    merge(this.input.statusChanges, this.input.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    if (!this.optional) {
      this.input.setValidators([Validators.required]);
    }
    this.setValidators();
  }

  setValidators(): void {
    if (this.type === 'tel' && !this.optional) {
      this.input.setValidators([Validators.required, this.phoneNumberValidator]);
    } else if (this.type === 'number' && !this.optional) {
      this.input.setValidators([Validators.required, this.moneyValidator]);
    }
    this.input.updateValueAndValidity();
  }

  updateErrorMessage() {
    if (this.input.valid) {
      this.errorMessage.set('');
      return;
    }

    if (this.input.hasError('required')) {
      this.errorMessage.set('Este campo precisa ser preenchido corretamente.');
    } else if (this.input.hasError('invalidPhone')) {
      this.errorMessage.set('Número de telefone inválido. Digite todos os 11 dígitos.');
    } else if (this.input.hasError('invalidMoney')) {
      this.errorMessage.set('O valor deve ser maior que R$ 0,00.');
    } else {
      this.errorMessage.set('Erro genérico. Verifique o campo.');
    }
  }

  decimalFormat(value: string): string {
    let numeros = value.replace(/\D/g, '');
    let numeroFormatado = parseInt(numeros, 10) || 0;
    return (numeroFormatado / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  onPhoneInputChange(value: string): string {
    let numeros = value.replace(/\D/g, '');
    if (numeros.length > 11) {
      numeros = numeros.substring(0, 11);
    }
    let formattedValue = numeros;
    if (numeros.length > 2) {
      formattedValue = `(${numeros.substring(0, 2)}) ${numeros.substring(2)}`;
    }
    if (numeros.length > 7) {
      formattedValue = `(${numeros.substring(0, 2)}) ${numeros.substring(2, 3)}.${numeros.substring(3, 7)}-${numeros.substring(7)}`;
    }
    return formattedValue;
  }

  onInputChange(event: Event) {
    if (this.type == 'number' && this.input.value) {
      const inputElement = event.target as HTMLInputElement;
      const formattedValue = this.decimalFormat(inputElement.value);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendNumberInputHandler(formattedValue);
    } else if (this.type == 'tel' && this.input.value) {
      const inputElement = event.target as HTMLInputElement;
      const formattedValue = this.onPhoneInputChange(inputElement.value);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendNumberInputHandler(formattedValue);
    } else if (this.optional && !this.input.value){
        this.sendNumberInputHandler("");
    }
  }

  sendNumberInputHandler(valueFormated: string) {
    this.inputValue.emit({ value: valueFormated, valid: this.input.valid });
  }

  moneyValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    const value = parseInt(rawValue, 10) || 0;
    if (value <= 0) {
      return { invalidMoney: true };
    }
    return null;
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    if (rawValue.length !== 11) {
      return { invalidPhone: true };
    }
    return null;
  }
}
