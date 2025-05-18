import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, viewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
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
import { InputAutocompleteDataPessoaComponent } from "../input-autocomplete-data-client/input-autocomplete-data-pessoa.component";
import { DependenteService } from '../../../core/services/dependenteService/dependente-service.service';
import { IPessoaAutocomplete } from '../../../interfaces/i-clienteAutocomplete';
import { IDependente } from '../../../interfaces/i-dependente';
import { LoadingBlueComponent } from "../loading-blue/loading-blue.component";

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
  @Input() idCliente = '';
  @Output() sendDependente = new EventEmitter();

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogFromMenu,
      {
        restoreFocus: false,
        autoFocus: false,
        data: {
          idCliente: this.idCliente
        }
      });

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
    InputNumberComponent,
    InputRadioComponent,
    InputAutocompleteDataPessoaComponent,
    LoadingBlueComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFromMenu implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DialogFromMenu>);
  dialodData = inject(MAT_DIALOG_DATA);

  nome: string = '';
  documento: string = '';
  poltrona: number | null = null;
  dependentes: IDependente[] = [];
  dependentesOptions: IPessoaAutocomplete[] = [];
  valid: boolean[] = [];
  typesDocument: string[] = ['RG', 'CPF', 'Registro']
  typeDocumentSelected: string = 'RG';
  dependenteService = inject(DependenteService);
  isLoadingDependentes = false;


  constructor(){
    for (let i = 0; i < 2; i++) {
      this.valid.push(false);
    }
  }

  ngOnInit() {
    this.dialogRef.afterOpened().subscribe(() => {
      if(this.dialodData.idCliente){
        this.isLoadingDependentes = true;
        this.dependenteService.getAll(this.dialodData.idCliente).subscribe(response => {
          this.dependentes = response;
          this.isLoadingDependentes = false;
          this.povoaDependentesOptions();
        });
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionarDependente(nome: string, typeDocumentSelected: string, documento: string, clienteId: string, poltrona: number){
    if(this.isValid()){
      const novoDependente = { nome, typeDocumentSelected, documento, clienteId, poltrona };
      this.dependenteService.create({ nome, typeDocumentSelected, documento, clienteId }).subscribe();
      this.dialogRef.close(novoDependente);
    }
  }

  povoaDependentesOptions(){
    if(this.dependentes){
      for(let dependente of this.dependentes){
        this.dependentesOptions.push({id: dependente.id!, nome: dependente.nome});
      }
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

  updateNomeDependenteHandler(value: any){
    const pessoa = value?.value || value;
    this.nome = pessoa.nome;
    if (this.dialodData.idCliente && pessoa.id) {
      this.dependentes.forEach(depentende => {
        if(depentende.id == pessoa.id){
          this.updateDocumentSelectedHandler({value: depentende.typeDocumentSelected, valid: true});
          this.updateDocumentoDependenteHandler({value: depentende.documento, valid: true});
        }
      })
    }
    this.valid[0] = value.valid ?? true;
  }


  updateDocumentSelectedHandler(value: IInput<string>){
    this.typeDocumentSelected = value.value
  }

  updateDocumentoDependenteHandler(value: IInput<string>){
    if(value.value == ''){
      this.documento = 'Não informado.'
    } else{
      this.documento = value.value;
    }
  }

  updatePoltronaDependenteHandler(value: IInput<number>){
    this.poltrona = value.value;
    this.valid[1] = value.valid;
  }
}
