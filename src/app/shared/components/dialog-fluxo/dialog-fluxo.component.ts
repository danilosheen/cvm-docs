import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from "../input-text/input-text.component";
import { InputNumberComponent } from "../input-number/input-number.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { InputDateComponent } from "../input-date/input-date.component";
import { IFluxoCaixa } from '../../../interfaces/i-fluxo-caixa';
import { InputSelectComponent } from "../input-select/input-select.component";
import { BrCurrencyPipe } from "../../../pipes/br-currency.pipe";

@Component({
  selector: 'app-dialog-fluxo',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    InputTextComponent,
    InputNumberComponent,
    InputSelectComponent,
    InputDateComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-fluxo.component.html',
  styleUrl: './dialog-fluxo.component.css'
})
export class DialogFluxoComponent {

  readonly dialogRef = inject(MatDialogRef<DialogFluxoComponent>);
  valid: boolean[] = [];
  tiposMovimentacao: string[] = ['ENTRADA', 'SAIDA'];
  formasPagamento: string[] = ['PIX', 'DINHEIRO', 'CARTAO_DE_CREDITO'];
  dataFluxo = inject(MAT_DIALOG_DATA);
  fluxoDataClean: IFluxoCaixa = {
    data: '',
    tipo: '',
    descricao:'',
    valor: null,
    formaPagamento: '',
  }

  fluxoData: any = this.dataFluxo.fluxo || this.fluxoDataClean;

  inputsDialog = inject(MAT_DIALOG_DATA);

  dateNow(){
    return new Date();
  }

  constructor(){
    for (let i = 0; i < 5; i++) {
      this.valid.push(false);
    }

    if(this.dataFluxo.editFluxo){
      this.updateDataMovimentacaoHandler({value: this.fluxoData.data, valid: true})
      this.updateTipoMovimentacaoHandler({value: this.fluxoData.tipo, valid: true})
      this.updateDescricaoHandler({value: this.fluxoData.descricao, valid: true})
      this.updateValorHandler({value: this.fluxoData.valor, valid: true})
      this.updateFormaPagamentoHandler({value: this.fluxoData.formaPagamento, valid: true})
    }
  }

  isValid(){
    for (let i of this.valid){
      if (i == false){
        return false;
      }
    }
    return true;
  }

  formatarParaBRL(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor).replace("R$", "").trim();
  }

  get valorFormatado(): string {
    if(this.fluxoData.valor){
      return this.fluxoData.valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return ''
  }

  updateDataMovimentacaoHandler(value: IInput<string>){
    this.fluxoData.data = value.value;
    this.valid[0] = value.valid;
  }

  updateTipoMovimentacaoHandler(value: IInput<string>){
    this.fluxoData.tipo = value.value;
    this.valid[1] = value.valid;
  }

  updateDescricaoHandler(value: IInput<string>){
    this.fluxoData.descricao = value.value;
    this.valid[2] = value.valid;
  }

  updateValorHandler(value: IInput<number>){
    this.fluxoData.valor = value.value;
    this.valid[3] = value.valid;
  }

  updateFormaPagamentoHandler(value: IInput<string>){
    this.fluxoData.formaPagamento = value.value;
    this.valid[4] = value.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickHandler(){
    this.dialogRef.close(this.fluxoData);
  }
}
