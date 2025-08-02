import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { IInput } from '../../../interfaces/i-handlerInput';

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
  @Input() defaultValue: string | number | null = null;
  @Input() optional: boolean = false;
  @Output() inputValueString = new EventEmitter<IInput<string>>();
  @Output() inputValueNumber = new EventEmitter<IInput<number>>();

  errorMessage = signal('');
  input: FormControl;

  constructor() {
    this.input = new FormControl('');
    merge(this.input.statusChanges, this.input.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

      if(this.defaultValue){
        this.input.setValue(this.defaultValue);
      }
  }

  ngOnInit(): void {
    if (!this.optional) {
      this.input.setValidators([Validators.required]);
    }
    if(this.defaultValue){
      if(this.type == 'number'){
        // Formata para BRL sem símbolo
        const formatted = this.defaultValue.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        this.input.setValue(formatted);
        this.sendInputHandler<string | number>(this.defaultValue);
      } else {
        this.input.setValue(this.defaultValue);
        this.sendInputHandler<string | number>(this.defaultValue);
      }
    }
    this.setValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue'] && changes['defaultValue'].currentValue !== undefined) {
      if(this.type == 'number' && this.defaultValue){
        // Formata para BRL sem símbolo
        const formatted = this.defaultValue.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        this.input.setValue(formatted);
      } else {
        this.input.setValue(this.defaultValue);
      }
      this.input.markAsPristine();
      this.input.markAsUntouched();
      this.input.updateValueAndValidity();
    }
  }

  setValidators(): void {
    if (this.type === 'tel' && !this.optional) {
      this.input.setValidators([Validators.required, this.phoneNumberValidator]);
    } else if (this.type === 'number' && !this.optional) {
      this.input.setValidators([Validators.required, this.moneyValidator]);
    } else if (this.type === 'cpf' && !this.optional) {
      this.input.setValidators([Validators.required, this.cpfValidator]);
    } else if (this.type === 'cnpj' && !this.optional){
      this.input.setValidators([Validators.required, this.cnpjValidator]);
    } else if (this.type === 'date' && !this.optional) {
      this.input.setValidators([Validators.required, this.dateValidator]);
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
    } else if (this.input.hasError('invalidCpf')) {
      this.errorMessage.set('O CPF digitado está incorreto');
    } else {
      this.errorMessage.set('Erro genérico. Verifique o campo.');
    }
  }

  decimalFormat(value: string): string {
  // Permite o sinal negativo no início
  const isNegative = value.trim().startsWith('-');
  let numeros = value.replace(/[^0-9]/g, '');
  let numeroFormatado = parseInt(numeros, 10) || 0;

  const resultado = (numeroFormatado / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isNegative ? `-${resultado}` : resultado;
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
    if (numeros.length === 10) {
      formattedValue = `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
    }
    return formattedValue;
  }

  onCpfFormat(value: string): string {

    let numeros = value.replace(/\D/g, '');
    if (numeros.length > 11) {
      numeros = numeros.substring(0, 11);
    }
    let formattedValue = numeros;

    if (numeros.length > 3) {
      formattedValue = `${numeros.substring(0, 3)}.${numeros.substring(3)}`;
    }

    if (numeros.length > 6) {
      formattedValue = `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6)}`;
    }

    if (numeros.length > 9) {
      formattedValue = `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6, 9)}-${numeros.substring(9)}`;
    }

    return formattedValue;
  }

  onCnpjFormat(value: string): string {
    let numeros = value.replace(/\D/g, '');
    if (numeros.length > 14) {
      numeros = numeros.substring(0, 14);
    }

    let formattedValue = numeros;

    if (numeros.length > 2) {
      formattedValue = `${numeros.substring(0, 2)}.${numeros.substring(2)}`;
    }

    if (numeros.length > 5) {
      formattedValue = `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5)}`;
    }

    if (numeros.length > 8) {
      formattedValue = `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5, 8)}/${numeros.substring(8)}`;
    }

    if (numeros.length > 12) {
      formattedValue = `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5, 8)}/${numeros.substring(8, 12)}-${numeros.substring(12)}`;
    }

    return formattedValue;
  }


  onDateFormat(value: string): string {

    let numeros = value.replace(/\D/g, '');

    if (numeros.length > 8) {
      numeros = numeros.substring(0, 8);
    }

    let formattedValue = numeros;

    if (numeros.length > 4) {
      formattedValue = `${numeros.substring(0, 2)}/${numeros.substring(2, 4)}/${numeros.substring(4)}`;
    } else if (numeros.length > 2) {
      formattedValue = `${numeros.substring(0, 2)}/${numeros.substring(2)}`;
    }

    return formattedValue;
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    if (this.type === 'number' && rawValue) {

      if (rawValue.trim() === '-') {
        this.input.setValue('0,00', { emitEvent: false });
        this.sendInputHandler<number>(0);
        return;
      }

      // Remove tudo que não é número ou "-"
      let onlyDigits = rawValue.replace(/[^\d-]/g, '');

      // Verifica se há "-" no final (ou em qualquer lugar)
      const isNegative = onlyDigits.includes('-');

      // Remove o "-" para processar só os dígitos
      onlyDigits = onlyDigits.replace(/-/g, '');

      // Converte para centavos
      let numericValue = parseFloat(onlyDigits) / 100;

      if (isNegative) {
        numericValue = numericValue * -1;
      }

      if (Object.is(numericValue, -0)) {
        numericValue = 0;
      }

      // Formata para BRL sem símbolo
      const formatted = numericValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      // Atualiza visualmente
      this.input.setValue(formatted, { emitEvent: false });
      this.sendInputHandler<number>(numericValue);

    } else if (this.type === 'tel' && rawValue) {
      const formattedValue = this.onPhoneInputChange(rawValue);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendInputHandler<string>(formattedValue);

    } else if (this.type === 'cpf' && rawValue) {
      const formattedValue = this.onCpfFormat(rawValue);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendInputHandler<string>(formattedValue);

    } else if (this.type === 'cnpj' && rawValue) {
      const formattedValue = this.onCnpjFormat(rawValue);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendInputHandler<string>(formattedValue);

    } else if (this.type === 'date' && rawValue) {
      const formattedValue = this.onDateFormat(rawValue);
      this.input.setValue(formattedValue, { emitEvent: false });
      this.sendInputHandler<string>(formattedValue);

    } else if (this.type === 'text' && rawValue) {
      this.sendInputHandler<number>(parseInt(rawValue));

    } else if (this.optional && !rawValue) {
      this.sendInputHandler<number | string>('');
    }
  }


  sendInputHandler<T extends string | number>(valueInputed: T): void {
    const payload = { value: valueInputed, valid: this.input.valid };

    if (typeof valueInputed === 'number') {
      this.inputValueNumber.emit(payload as IInput<number>);
    } else {
      this.inputValueString.emit(payload as IInput<string>);
    }
  }

  moneyValidator(control: AbstractControl): ValidationErrors | null {
    const raw = control.value ?? '';
    const isNegative = String(raw).trim().startsWith('-');
    const rawValue = String(raw).replace(/[^0-9]/g, '');
    const value = parseInt(rawValue, 10) || 0;
    const signedValue = isNegative ? -value : value;

    // Se quiser permitir valores negativos e positivos, apenas rejeitar zero:
    if (signedValue === 0) {
      return { invalidMoney: true };
    }

    return null;
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    if (rawValue.length !== 10 && rawValue.length !== 11) {
      return { invalidPhone: true };
    }
    return null;
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    if (rawValue.length !== 11) {
      return { invalidCpf: true };
    }
    return null;
  }

  cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    if (rawValue.length !== 14) {
      return { invalidCnpj: true };
    }
    return null;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value ? control.value.replace(/\D/g, '') : '';
    if (rawValue.length !== 8) {
      return { invalidDate: true };
    }

    const day = parseInt(rawValue.substring(0, 2), 10);
    const month = parseInt(rawValue.substring(2, 4), 10);
    const year = parseInt(rawValue.substring(4), 10);
    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValidDate) {
      return { invalidDate: true };
    }

    return null;
  }
}
