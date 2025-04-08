import {Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-input-autocomplete',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.css'
})
export class InputAutocompleteComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() defaultValue: string = '';
  @Input() errorMessage = '';
  @Input() options: string[] = [];
  @Output() inputValue = new EventEmitter();

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  inputControl = new FormControl('');
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultValue']) {
      this.inputControl.setValue(this.defaultValue);
      this.inputControl.markAsPristine();
      this.inputControl.markAsUntouched();
      this.inputControl.updateValueAndValidity();
      if(this.defaultValue == ''){
        this.filteredOptions = [];
      }
    }
  }


  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  setValue(option: string){
    this.inputControl.setValue(option);
    this.sendText()
  }

  sendText(){
    if(this.inputControl.value){
      this.inputValue.emit({value: this.inputControl.value.trim(), valid: this.inputControl.valid})
    }
  }
}


