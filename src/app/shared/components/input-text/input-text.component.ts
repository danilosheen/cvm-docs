import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
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
export class InputTextComponent {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';
  @Output() inputValue = new EventEmitter<string> ();

  readonly input = new FormControl('', [Validators.required]);

  errorMessage = signal('');

  constructor() {
    merge(this.input.statusChanges, this.input.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.input.hasError('required')) {
      this.errorMessage.set('Este campo não pode ser vazio.');
    } else {
      this.errorMessage.set('');
    }
  }

  sendTextInputHandler(){
    //envia output
    this.inputValue.emit(this.input.value || "");
    // console.log(this.input);
  }
}
