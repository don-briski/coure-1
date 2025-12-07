import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../../core/model';
import { TaskService } from '../../../core/service';
import { SharedModule } from '../../../shared/shared-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilService } from '../../../core/utils.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss',
})
export class CreateTask {
  form!: FormGroup;
  PriorityOptions: string[] = ['Low', 'Medium', 'High'];
  StatusOptions: string[] = ['Pending', 'In Progress', 'Completed'];
  taskId: number | null = null;
  task: Task | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task?: Task },
    private dialogRef: MatDialogRef<CreateTask>  ,
    private fb: FormBuilder,
    private taskService: TaskService,
    private utils: UtilService
  )
  {}

  ngOnInit() {
    this.task = this.data.task;
    this.taskId = this.task?.id || null;
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required],
    });

        if (this.task) {
      this.form.patchValue({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        dueDate: new Date(this.task.dueDate),
        priority: this.task.priority,
        status: this.task.status
      });
    }
  }

  save() {
    if (this.form.invalid) return;
        const formValue = this.form.value;

    const task: Task = {
      ...formValue,
      id: formValue.id,
      dueDate: new Date(formValue.dueDate).toISOString(),
    };

    console.log('Saving task:', task);


    if (task.id) {
      this.taskService.updateTask(task).subscribe({
        next: () => {
          this.utils.showSuccess('Task updated successfully');
          this.dialogRef.close('success');
        },
        error: (err) => {
          this.utils.showError('Failed to update task: ' + err.message);
        }
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          this.utils.showSuccess('Task created successfully');
          this.dialogRef.close('success');
        },
        error: (err) => {
          this.utils.showError('Failed to create task: ');
        }
        });
    }
  }
}
