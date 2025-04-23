import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { IPessoaAutocomplete } from '../../../interfaces/i-clienteAutocomplete';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-input-autocomplete-data-pessoa',
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
export class InputAutocompleteDataPessoaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() defaultValue: string = '';
  @Input() errorMessage = '';
  @Input() options: IPessoaAutocomplete[] = [];
  @Output() inputValue = new EventEmitter<IPessoaAutocomplete | { value: IPessoaAutocomplete; valid: boolean }>();


  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  inputControl = new FormControl<IPessoaAutocomplete | string>('');
  filteredOptions: IPessoaAutocomplete[] = [];
  idSelected = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultValue']) {
      const selected = this.options.find(opt => opt.nome === this.defaultValue);
      if (selected) {
        this.inputControl.setValue(selected);
      } else if(this.defaultValue == ''){
        this.inputControl.setValue('');
      }

      this.inputControl.markAsPristine();
      this.inputControl.markAsUntouched();
      this.inputControl.updateValueAndValidity();
      if (!this.defaultValue) {
        this.filteredOptions = [];
      }
    }
  }

  filter() {
    const value = typeof this.inputControl.value === 'string'
      ? this.inputControl.value.toLowerCase()
      : this.inputControl.value!.nome!.toLowerCase();

    this.filteredOptions = this.options.filter(option =>
      option.nome.toLowerCase().includes(value)
    );
  }

  displayFn(option: { id: string; nome: string } | null): string {
    return option?.nome ?? '';
  }

  setValue(optionSelecionado: { id: string; nome: string }) {
    if (optionSelecionado?.id) {
      this.inputControl.setValue(optionSelecionado);
      this.inputValue.emit(optionSelecionado);
    }
  }

  sendText() {
    const value = this.inputControl.value;

    if (typeof value === 'string') {
      this.inputValue.emit({
        value: { nome: value.trim(), id: this.idSelected },
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
