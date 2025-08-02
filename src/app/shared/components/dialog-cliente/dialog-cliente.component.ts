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
import { InputRadioComponent } from "../input-radio/input-radio.component";
import { ICliente } from '../../../interfaces/i-cliente';
import { InputDateComponent } from "../input-date/input-date.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-cliente',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    InputTextComponent,
    InputNumberComponent,
    InputRadioComponent,
    NgIf
    // InputDateComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-cliente.component.html',
  styleUrl: './dialog-cliente.component.css'
})
export class DialogClienteComponent {

  readonly dialogRef = inject(MatDialogRef<DialogClienteComponent>);
  valid: boolean[] = [];
  typesDocument: string[] = ['RG', 'CPF', 'CNPJ'];
  // typeDocumentSelected = 'CPF';

  clienteDataClean: ICliente = {
    nome: '',
    dataNascimento: '',
    contato: '',
    typeDocumentSelected: 'RG',
    documento: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
  }

  inputsDialog = inject(MAT_DIALOG_DATA);
  title: string = this.inputsDialog.title;
  confirmButton: string = this.inputsDialog.confirmButton;
  clienteData: ICliente = this.inputsDialog.cliente || this.clienteDataClean;
  // clienteData: ICliente = inject(MAT_DIALOG_DATA);

  dateNow(){
    return new Date();
  }

  constructor(){
    for (let i = 0; i < 7; i++) {
      this.valid.push(false);
    }

    if(this.clienteData){
      this.updateNomeClienteHandler({value: this.clienteData.nome, valid: true});
      this.updateDataNascimentoHandler({value: this.clienteData.dataNascimento || '', valid: true});
      this.updateContatoHandler({value: this.clienteData.contato, valid: true});
      this.updateEmailHandler({value: this.clienteData.email || '', valid: true});
      this.updateDocumentSelectedHandler({value: this.clienteData.typeDocumentSelected, valid: true});
      this.updateDocumentoClienteHandler({value: this.clienteData.documento, valid: true});
      this.updateCidadeHandler({value: this.clienteData.cidade || '', valid: true});
      this.updateBairroHandler({value: this.clienteData.bairro || '', valid: true});
      this.updateRuaHandler({value: this.clienteData.rua || '', valid: true});
      this.updateNumeroHandler({value: this.clienteData.numero || '', valid: true});
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

  updateNomeClienteHandler(value: IInput<string>){
    this.clienteData.nome = value.value;
    this.valid[0] = value.valid;
  }

  updateDataNascimentoHandler(value: IInput<string>){
    this.clienteData.dataNascimento = value.value;
  }

  updateContatoHandler(value: IInput<string>){
    this.clienteData.contato = value.value;
    this.valid[1] = value.valid;
  }

  updateEmailHandler(value: IInput<string>){
    this.clienteData.email = value.value;
  }

  updateDocumentSelectedHandler(value: IInput<string>){
    if(this.clienteData.typeDocumentSelected !== value.value){
      this.clienteData.documento = ''
    }
    this.clienteData.typeDocumentSelected = value.value;
  }

  updateDocumentoClienteHandler(value: IInput<string>){
    this.clienteData.documento = value.value;
  }

  updateEstadoHandler(value: IInput<string>){
    this.clienteData.estado = value.value;
    this.valid[2] = value.valid;
  }

  updateCidadeHandler(value: IInput<string>){
    this.clienteData.cidade = value.value;
    this.valid[3] = value.valid;
  }

  updateBairroHandler(value: IInput<string>){
    this.clienteData.bairro = value.value;
    this.valid[4] = value.valid;
  }

  updateRuaHandler(value: IInput<string>){
    this.clienteData.rua = value.value;
    this.valid[5] = value.valid;
  }

  updateNumeroHandler(value: IInput<string>){
    this.clienteData.numero = value.value;
    this.valid[6] = value.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickHandler(){
    this.dialogRef.close(this.clienteData);
  }

}
