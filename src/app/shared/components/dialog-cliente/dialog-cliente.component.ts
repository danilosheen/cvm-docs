import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from "../input-text/input-text.component";
import { InputNumberComponent } from "../input-number/input-number.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { InputRadioComponent } from "../input-radio/input-radio.component";
import { ICliente } from '../../../interfaces/i-cliente';
import { InputDateComponent } from "../input-date/input-date.component";

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
    InputDateComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-cliente.component.html',
  styleUrl: './dialog-cliente.component.css'
})
export class DialogClienteComponent {

  readonly dialogRef = inject(MatDialogRef<DialogClienteComponent>);
  valid: boolean[] = [];
  typesDocument: string[] = ['CPF', 'RG'];
  typeDocumentSelected = 'CPF';

  clienteData: ICliente = {
    nome: '',
    dataNascimento: '',
    contato: '',
    cpf: '',
    documento: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    updatedAt: this.dateNow()
  }

  dateNow(){
    return new Date();
  }


  constructor(){
    for (let i = 0; i < 7; i++) {
      this.valid.push(false);
    }
  }

  // adicionarDependente(nome: string, documento: string, poltrona: string){
  //   if(this.isValid()){
  //     const novoDependente = { nome, documento, poltrona };
  //     this.dialogRef.close(novoDependente);
  //   }
  // }

  isValid(){
    for (let i of this.valid){
      if (i == false){
        return false;
      }
    }
    return true;
  }

  updateNomeClienteHandler(value: IInput){
    this.clienteData.nome = value.value;
    this.valid[0] = value.valid;
  }

  updateDataNascimentoHandler(value: IInput){
    this.clienteData.dataNascimento = value.value;
    this.valid[1] = value.valid;
  }

  updateContatoHandler(value: IInput){
    this.clienteData.contato = value.value;
    this.valid[2] = value.valid;
  }

  updateDocumentSelectedHandler(value: IInput){
    this.typeDocumentSelected = value.value;
  }

  updateDocumentoClienteHandler(value: IInput){
    this.clienteData.documento = value.value;
  }

  updateCidadeHandler(value: IInput){
    this.clienteData.cidade = value.value;
    this.valid[3] = value.valid;
  }

  updateBairroHandler(value: IInput){
    this.clienteData.bairro = value.value;
    this.valid[4] = value.valid;
  }

  updateRuaHandler(value: IInput){
    this.clienteData.rua = value.value;
    this.valid[5] = value.valid;
  }

  updateNumeroHandler(value: IInput){
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
