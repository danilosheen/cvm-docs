import {ChangeDetectionStrategy, Component, HostListener, Inject, inject, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { InputNumberComponent } from "../input-number/input-number.component";
import { IInput } from '../../../interfaces/i-handlerInput';

@Component({
  selector: 'app-dialog-saldo',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    InputNumberComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-saldo.component.html',
  styleUrl: './dialog-saldo.component.css'
})
export class DialogSaldoComponent {
  readonly dialogRef = inject(MatDialogRef<DialogSaldoComponent>);
  valueInputed = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      dialogTitle: string | 'Adicionar saldo anterior',
      dialogContent: string | 'Insira o valor do saldo anterior',
      saldoAnterior: number
    }
  ) {
    this.valueInputed = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(data.saldoAnterior).replace("R$", "").trim();
  }

  onClickHandler(){
    this.dialogRef.close(this.valueInputed);
  }

  updateValueHandler(value: IInput){
    this.valueInputed = value.value;
  }
}
