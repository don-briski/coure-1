import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../core/model';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
})
export class ConfirmationModal {

   constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title?: string; message: string },
    private dialogRef: MatDialogRef<ConfirmationModal>
   ) {
   }
onConfirm() {
  this.dialogRef.close('confirm');
}
onCancel() {
  this.dialogRef.close('cancel');
}


}
