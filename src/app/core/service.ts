import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, throwError } from 'rxjs';
import { Task } from './model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // private apiUrl = environment.apiUrl;
  private apiUrl = '/api/tasks';
  private storageKey = 'tm_tasks_v1';
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    const local = this.loadFromStorage();
    if (local.length) this.tasks$.next(local);

    this.syncFromServer().subscribe();
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
      catchError(() => {
        // fallback to local storage data
        return of(this.tasks$.value);
      })
    );
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      map(created => {
        const tasks = [...this.tasks$.value, created];
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return created;
      }),
      catchError(() => {
        // offline fallback
        const offlineTask = { ...task, id: Date.now() };
        const tasks = [...this.tasks$.value, offlineTask];
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return of(offlineTask);
      })
    );
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      map(updated => {
        const tasks = this.tasks$.value.map(t => t.id === updated.id ? updated : t);
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return updated;
      }),
      catchError(() => {
        // offline fallback
        const tasks = this.tasks$.value.map(t => t.id === task.id ? task : t);
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return of(task);
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        const tasks = this.tasks$.value.filter(t => t.id !== id);
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
      }),
      catchError(() => {
        const tasks = this.tasks$.value.filter(t => t.id !== id);
        this.tasks$.next(tasks);
        this.saveToStorage(tasks);
        return of(null);
      })
    );
  }

  private loadFromStorage(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch { return []; }
  }

  private saveToStorage(tasks: Task[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } catch {}
  }

  filterTasks(filters: { priority?: string; status?: string }) {
    let tasks = [...this.tasks$.value];
    if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);
    if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
    return tasks;
  }
}
