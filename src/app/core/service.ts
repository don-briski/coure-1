import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, throwError } from 'rxjs';
import { Task } from './model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;
  private storageKey = 'tm_tasks_v1';
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {

    const local = this.loadFromStorage();
    if (local.length) this.tasks$.next(local);
    this.syncFromServer().subscribe({
      next: (data) => { },
      error: () => {}
    });
  }

  getTasksObservable() {
    return this.tasks$.asObservable();
  }

  syncFromServer() {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks => {
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return tasks;
      }),
      catchError(err => {
        return of(this.tasks$.value);
      })
    );
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      map(created => {
        const current = [...this.tasks$.value, created];
        this.tasks$.next(current);
        this.saveToStorage(current);
        return created;
      }),
      catchError(err => {
        const tempId = Date.now();
        const created = { ...task, id: tempId };
        const current = [...this.tasks$.value, created];
        this.tasks$.next(current);
        this.saveToStorage(current);
        return of(created);
      })
    );
  }

  updateTask(task: Task) {
    if (!task.id) return throwError(() => new Error('Missing id'));
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      map(updated => {
        const current = this.tasks$.value.map(t => (t.id === updated.id ? updated : t));
        this.tasks$.next(current);
        this.saveToStorage(current);
        return updated;
      }),
      catchError(err => {
        const current = this.tasks$.value.map(t => (t.id === task.id ? task : t));
        this.tasks$.next(current);
        this.saveToStorage(current);
        return of(task);
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        const current = this.tasks$.value.filter(t => t.id !== id);
        this.tasks$.next(current);
        this.saveToStorage(current);
        return;
      }),
      catchError(err => {
        const current = this.tasks$.value.filter(t => t.id !== id);
        this.tasks$.next(current);
        this.saveToStorage(current);
        return of(undefined);
      })
    );
  }

  private saveToStorage(tasks: Task[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Could not save tasks to localStorage', e);
    }
  }

  private loadFromStorage(): Task[] {
    try {
      const json = localStorage.getItem(this.storageKey);
      if (!json) return [];
      return JSON.parse(json) as Task[];
    } catch {
      return [];
    }
  }

  filterTasks(filters: { priority?: string; status?: string }) {
    let tasks = [...this.tasks$.value];
    if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);
    if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
    return tasks;
  }
}
