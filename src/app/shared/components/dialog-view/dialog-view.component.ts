import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { IDependente } from '../../../interfaces/i-dependente';
import { DependenteService } from '../../../core/services/dependenteService/dependente-service.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-view',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatTooltipModule
  ],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-view.component.html',
  styleUrl: './dialog-view.component.css'
})
export class DialogViewComponent {

  readonly dialogRef = inject(MatDialogRef<DialogViewComponent>);
  inputsData = inject(MAT_DIALOG_DATA);
  type: string = this.inputsData.type;
  data: any = this.inputsData.pessoa;
  datePipe: DatePipe = inject(DatePipe);
  updatedAt: string = this.datePipe.transform(this.data.updatedAt, "dd/MM/yyyy 'às' HH:mm:ss") ?? '';
  ultimaViagem: string = this.datePipe.transform(this.data.ultimaViagem, "dd/MM/yyyy") ?? '';
  dependenteService = inject(DependenteService);
  dependentes: IDependente[] = [];
  showDependentes = false;
  readonly snackBar = inject(MatSnackBar);


  constructor() {
    if(this.type== 'cliente'){
      this.dependenteService.getAll(this.data.id).subscribe(dependentes=>{
        this.dependentes = dependentes;
      });
    }
  }

  toggleExibeDependentes(){
    if(this.dependentes.length > 0){
      this.showDependentes = !this.showDependentes;
    }
  }

  removerDependente(dependenteID: string, index: number){
    this.dependenteService.delete(dependenteID).subscribe({
      next: (msg) => {
        this.snackBar.open(msg.message, 'Ok', {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (error) =>{
        console.log(error)
      }
    });
    this.dependentes.splice(index, 1);
  }

  onClickHandler(){
    this.dialogRef.close(true);
  }
}
