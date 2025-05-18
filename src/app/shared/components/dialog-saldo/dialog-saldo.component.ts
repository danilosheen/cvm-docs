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
import { BrCurrencyPipe } from "../../../pipes/br-currency.pipe";

@Component({
  selector: 'app-dialog-saldo',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    InputNumberComponent,
    BrCurrencyPipe
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-saldo.component.html',
  styleUrl: './dialog-saldo.component.css'
})
export class DialogSaldoComponent {
  readonly dialogRef = inject(MatDialogRef<DialogSaldoComponent>);
  valueInputed: number | string = '0,00';
  data = inject(MAT_DIALOG_DATA)

  constructor() {
    if(this.data.saldoAnterior){
      this.valueInputed = this.data.saldoAnterior
    }
  }

  onClickHandler(){
    this.dialogRef.close(this.valueInputed);
  }

  updateValueHandler(value: IInput<number>){
    this.valueInputed = value.value;
  }
}
