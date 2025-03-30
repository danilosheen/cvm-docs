import { NgClass } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

@Component({
  selector: 'app-input-text',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements OnInit{

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';
  @Input() optional: boolean = false;
  @Output() inputValue = new EventEmitter();

  // readonly input = new FormControl('', this.optional ? [] : [Validators.required]);

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
    // this.setValidators();
  }

  // setValidators(): void {
  //   if (!this.optional) {
  //     this.input.setValidators([Validators.required]);
  //   } else {
  //     this.input.setValidators([Validators.required, this.moneyValidator]);
  //   }
  //   this.input.updateValueAndValidity();
  // }

  updateErrorMessage() {
    if (this.input.hasError('required') && !this.optional) {
      this.errorMessage.set('Este campo não pode ser vazio.');
    } else {
      this.errorMessage.set('');
    }
  }

  sendTextInputHandler(){
    //envia output
    this.inputValue.emit({value: this.input.value.trim(), valid: this.input.valid});
  }
}
