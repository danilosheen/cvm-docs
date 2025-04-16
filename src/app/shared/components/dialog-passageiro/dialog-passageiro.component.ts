import {ChangeDetectionStrategy, Component, HostListener, inject} from '@angular/core';
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
import { IPassageiro } from '../../../interfaces/i-passageiro';

@Component({
  selector: 'app-dialog-passageiro',
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-passageiro.component.html',
  styleUrl: './dialog-passageiro.component.css'
})
export class DialogPassageiroComponent {
  readonly dialogRef = inject(MatDialogRef<DialogPassageiroComponent>);
  valid: boolean[] = [];
  typesDocument: string[] = ['RG', 'CPF', 'Registro'];
  passageiroData: IPassageiro = inject(MAT_DIALOG_DATA);
  typeDocumentSelected = this.passageiroData.typeDocumentSelected;

  dateNow(){
    return new Date();
  }

  constructor(){

    // inicia validadores como false
    for (let i = 0; i < 2; i++) {
      this.valid.push(false);
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

  // Action buttons
  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickHandler(){
    this.dialogRef.close(this.passageiroData);
  }

  // Handlers
  updateNomeClienteHandler(value: IInput){
    this.passageiroData.nome = value.value;
    this.valid[0] = value.valid;
  }

  updateDocumentSelectedHandler(value: IInput){
    if (this.passageiroData.typeDocumentSelected !== value.value) {
      this.passageiroData.documento = '';
    }
    this.passageiroData.typeDocumentSelected = value.value;
  }

  updateDocumentoClienteHandler(value: IInput){
    this.passageiroData.documento = value.value;
    this.valid[1] = value.valid;
  }

}
