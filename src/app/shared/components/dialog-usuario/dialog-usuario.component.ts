import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from "../input-text/input-text.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { IUsuario } from '../../../interfaces/i-usuario';

@Component({
  selector: 'app-dialog-usuario',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    InputTextComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.css'
})
export class DialogUsuarioComponent {

  readonly dialogRef = inject(MatDialogRef<DialogUsuarioComponent>);
  valid: boolean[] = [];
  inputsData: any = inject(MAT_DIALOG_DATA);
  usuarioClean: IUsuario = {
    nome: '',
    email: '',
    senha: '',
  }
  usuarioData: IUsuario = this.inputsData.usuario || this.usuarioClean;
  title: string = this.inputsData.title;
  confirmButton: string = this.inputsData.confirmButton;

  dateNow() {
    return new Date();
  }

  constructor() {
    // inicia validadores como false
    for (let i = 0; i <= 2; i++) {
      this.valid.push(false);
    }

    if(this.inputsData?.usuario?.senha){
      this.updateSenhaHandler({value: '', valid: false});
    }
  }

  isValid() {
    for (let i of this.valid) {
      if (i == false) {
        return false;
      }
    }
    return true;
  }

  // Action buttons
  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickHandler() {
    this.dialogRef.close(this.usuarioData);
  }

  // Handlers
  updateNomeUsuarioHandler(value: IInput<string>) {
    this.usuarioData.nome = value.value;
    this.valid[0] = value.valid;
  }

  updateEmailHandler(value: IInput<string>) {
    this.usuarioData.email = value.value;
    this.valid[1] = value.valid;
  }

  updateSenhaHandler(value: IInput<string>) {
    this.usuarioData.senha = value.value;
    this.valid[2] = value.valid;
  }

}
