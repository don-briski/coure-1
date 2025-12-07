import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private snack: MatSnackBar) {}

  showSuccess(message: string) {
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  showError(message: string) {
    this.snack.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
