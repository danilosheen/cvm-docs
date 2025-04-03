import {ChangeDetectionStrategy, Component, HostListener, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-generic',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-generic.component.html',
  styleUrl: './dialog-generic.component.css'
})
export class DialogGenericComponent {
  readonly dialogRef = inject(MatDialogRef<DialogGenericComponent>);

  onClickHandler(){
    this.dialogRef.close(true);
  }
}
