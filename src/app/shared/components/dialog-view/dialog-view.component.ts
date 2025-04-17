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
  inputsData = inject(MAT_DIALOG_DATA);
  type: string = this.inputsData.type;
  data: any = this.inputsData.pessoa;
  datePipe: DatePipe = inject(DatePipe);
  updatedAt: string = this.datePipe.transform(this.data.updatedAt, "dd/MM/yyyy 'às' HH:mm:ss") ?? '';


  constructor() {

  }

  onClickHandler(){
    this.dialogRef.close(true);
  }
}
