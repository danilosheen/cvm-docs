import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  @Output() checkedValues = new EventEmitter();

  private readonly _formBuilder = inject(FormBuilder);
  readonly panelOpenState = signal(false);
  servicos!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializa o formulário com todos os checkboxes desmarcados
    this.servicos = this.fb.group({
      cafeDaManha: [false],
      almoco: [false],
      jantar: [false],
      roteiro: [false]
    });

    // Escuta mudanças no formulário
    this.servicos.valueChanges.subscribe((val) => {
      // Pega os checkboxes marcados
      const selecionados = Object.keys(val).filter(key => val[key]);

      // Emite o evento apenas se algum checkbox estiver marcado
      if (selecionados.length > 0) {
        this.checkedValues.emit(selecionados);
      }
    });
  }
}
