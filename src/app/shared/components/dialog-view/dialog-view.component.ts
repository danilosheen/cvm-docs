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
import { ICliente } from '../../../interfaces/i-cliente';

@Component({
  selector: 'app-dialog-view',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose
  ],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-view.component.html',
  styleUrl: './dialog-view.component.css'
})
export class DialogViewComponent {

  readonly dialogRef = inject(MatDialogRef<DialogViewComponent>);
  data: ICliente = inject(MAT_DIALOG_DATA);
  datePipe: DatePipe = inject(DatePipe);
  updatedAt = this.datePipe.transform(this.data.updatedAt, "dd/MM/yyyy 'às' HH:mm:ss");


  constructor() {
    console.log(this.data);
  }

  onClickHandler(){
    this.dialogRef.close(true);
  }
}
