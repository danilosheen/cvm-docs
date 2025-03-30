import {ChangeDetectionStrategy, Component, inject, Input, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-input-checkbox',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.css'
})
export class InputCheckboxComponent {

  @Input() label = '';
  @Input() type = '';

  private readonly _formBuilder = inject(FormBuilder);
  readonly panelOpenState = signal(false);

  readonly servicos = this._formBuilder.group(
    {
      cafeDaManha: false,
      almoco: false,
      jantar: false,
      roteiro: false,
    }
  );
}
