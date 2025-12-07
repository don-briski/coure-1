import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../core/model';
import { TaskService } from '../../core/service';
import { SharedModule } from '../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { CreateTask } from '../component/create-task/create-task';
import { ConfirmationModal } from '../component/confirmation-modal/confirmation-modal';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from '../../core/utils.service';
import { ViewTask } from '../component/view-task/view-task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  PriorityOptions: string[] = ['Low', 'Medium', 'High'];
  StatusOptions: string[] = ['Pending', 'In Progress', 'Completed'];

  dataSource = new MatTableDataSource<Task>([]);
  tasks: Task[] = [];
  displayedColumns = ['title', 'dueDate', 'priority', 'status', 'actions'];

  filter = { priority: '', status: '' };
  allTasks: Task[] = [];

  totalTasks = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private utils: UtilService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTasks() {
    this.taskService.getTasksObservable().subscribe((tasks) => {
      this.allTasks = tasks;
      this.applyFilters();
    });

    this.taskService.syncFromServer().subscribe();
  }

  applyFilters() {
    let filteredTasks = [...this.allTasks];

    if (this.filter.priority) {
      filteredTasks = filteredTasks.filter(
        (t) => t.priority === this.filter.priority
      );
    }

    if (this.filter.status) {
      filteredTasks = filteredTasks.filter(
        (t) => t.status === this.filter.status
      );
    }

    this.dataSource.data = filteredTasks;

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.filter = { priority: '', status: '' };
    this.applyFilters();
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  createTask() {
    this.dialog.open(CreateTask, {
      width: '600px',
      disableClose: true,
      data: {},
    });
  }

  edit(task: Task) {
    this.dialog.open(CreateTask, {
      data: {
        task: task,
      },
      width: '600px',
      disableClose: true,
    });
  }

  view(task: Task) {
    this.dialog.open(ViewTask, {
      data: {
        taskData: task,
      },
      width: '600px',
      disableClose: true,
    });
  }

  deleteTask(id: number) {
    if (!id) return;

    console.log('Deleting task with id:', id);
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to delete this task?',
      },
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.utils.showSuccess('Task deleted successfully');
          },
          error: (err) => {
            this.utils.showError('Failed to delete task: ');
          },
        });
      }
    });
  }
}
