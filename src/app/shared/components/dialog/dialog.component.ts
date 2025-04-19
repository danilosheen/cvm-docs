import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output, viewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputTextComponent } from "../input-text/input-text.component";
import { InputNumberComponent } from "../input-number/input-number.component";
import { IInput } from '../../../interfaces/i-handlerInput';
import { InputRadioComponent } from "../input-radio/input-radio.component";

@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Output() sendDependente = new EventEmitter();

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogFromMenu, { restoreFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendDependente.emit(result);
      }
      this.menuTrigger().focus();
    });
  }
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'dialog-from-menu.component.html',
  styleUrl: './dialog.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    InputTextComponent,
    InputNumberComponent,
    InputRadioComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFromMenu {

  readonly dialogRef = inject(MatDialogRef<DialogFromMenu>);

  nome: string = '';
  documento: string = '';
  poltrona: string = '';
  dependentes: object[] = [];
  valid: boolean[] = [];
  typesDocument: string[] = ['RG', 'CPF', 'Registro']
  typeDocumentSelected: string = 'RG';


  constructor(){
    for (let i = 0; i < 2; i++) {
      this.valid.push(false);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionarDependente(nome: string, documento: string, poltrona: string){
    if(this.isValid()){
      const novoDependente = { nome, documento, poltrona };
      this.dialogRef.close(novoDependente);
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

  updateNomeDependenteHandler(value: IInput){
    this.nome = value.value;
    this.valid[0] = value.valid;
  }

  updateDocumentoDependenteHandler(value: IInput){
    if(value.value == ''){
      this.documento = 'Não informado.'
    } else{
      this.documento = value.value;
    }
  }

  updateDocumentSelectedHandler(value: IInput){
    this.typeDocumentSelected = value.value
  }

  updatePoltronaDependenteHandler(value: IInput){
    this.poltrona = value.value;
    this.valid[1] = value.valid;
  }
}
