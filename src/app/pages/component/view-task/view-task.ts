import { Component, Inject } from '@angular/core';
import { Task } from '../../../core/model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-view-task',
  standalone: false,
  templateUrl: './view-task.html',
  styleUrl: './view-task.scss',
})
export class ViewTask {

  constructor(
        @Inject(MAT_DIALOG_DATA)
    public data: {  taskData: Task },
    private dialogRef: MatDialogRef<ConfirmationModal>
  ) { }

}
