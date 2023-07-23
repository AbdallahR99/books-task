import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  success(message: string, duration = 5000): void {
    this.snackbar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  default(message: string, duration = 5000): void {
    this.snackbar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-default'],
    });
  }

  error(message: string,  duration = 5000): void {
    this.snackbar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-danger'],

    });
  }

}
