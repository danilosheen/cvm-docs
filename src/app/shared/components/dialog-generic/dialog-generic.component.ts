import {ChangeDetectionStrategy, Component, HostListener, Inject, inject, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-generic',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-generic.component.html',
  styleUrl: './dialog-generic.component.css'
})
export class DialogGenericComponent {
  readonly dialogRef = inject(MatDialogRef<DialogGenericComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      dialogTitle: string | 'Remover item';
      dialogContent: string | 'Tem certeza que deseja remover este item?'
    }
  ) {}

  onClickHandler(){
    this.dialogRef.close(true);
  }
}
