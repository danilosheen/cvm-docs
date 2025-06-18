import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IPessoaAutocomplete } from '../../../interfaces/i-clienteAutocomplete';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-input-autocomplete-data-pessoa',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './input-autocomplete-data-pessoa.component.html',
  styleUrl: './input-autocomplete-data-pessoa.component.css'
})
export class InputAutocompleteDataPessoaComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() defaultValue: string = '';
  @Input() errorMessage = '';
  @Input() options: IPessoaAutocomplete[] = [];
  @Output() inputValue = new EventEmitter<IPessoaAutocomplete | { value: IPessoaAutocomplete; valid: boolean } | any>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  inputControl = new FormControl<IPessoaAutocomplete | string>('');
  filteredOptions: IPessoaAutocomplete[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultValue']) {
      this.setInitialValue(this.defaultValue);
    }
  }

  ngOnInit() {
    this.setInitialValue(this.defaultValue);
  }

  private setInitialValue(value: string) {
    if (value) {
      const matchedOption = this.options.find(opt => opt.nome === value);
      this.inputControl.setValue(matchedOption || value);
      this.inputValue.emit({
        value: matchedOption || { nome: value.trim(), id: '' },
        valid: this.inputControl.valid
      });
    } else {
      this.inputControl.setValue('');
      this.filteredOptions = [];
    }

    this.inputControl.markAsPristine();
    this.inputControl.markAsUntouched();
    this.inputControl.updateValueAndValidity();
  }

  filter() {
    const value = typeof this.inputControl.value === 'string'
      ? this.inputControl.value.toLowerCase()
      : this.inputControl.value?.nome.toLowerCase();

    this.filteredOptions = this.options.filter(option =>
      option.nome.toLowerCase().includes(value || '')
    );
  }

  displayFn(value: IPessoaAutocomplete | string | null): string {
    if (typeof value === 'string') return value;
    return value?.nome ?? '';
  }

  setValue(optionSelecionado: IPessoaAutocomplete) {
    this.inputControl.setValue(optionSelecionado);
    this.inputValue.emit({
      value: optionSelecionado,
      valid: this.inputControl.valid
    });
  }

  sendText() {
    const value = this.inputControl.value;

    if (typeof value === 'string') {
      this.inputValue.emit({
        value: { nome: value.trim(), id: '' },
        valid: this.inputControl.valid
      });
    } else if (value && typeof value === 'object') {
      this.inputValue.emit({
        value,
        valid: this.inputControl.valid
      });
    }
  }
}
