import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  success(message: string, duration = 5000, config?: MatSnackBarConfig): void {
    this.snackbar.open(message, 'Close', {
      duration,
      ...config,
      panelClass: ['snackbar-success', ...(config?.panelClass ?? [])],
    });
  }

  default(message: string, duration = 5000, config?: MatSnackBarConfig): void {
    this.snackbar.open(message, 'Close', {
      duration,
      ...config,
      panelClass: ['snackbar-default', ...(config?.panelClass ?? [])],
    });
  }

  error(message: string,  duration = 5000, config?: MatSnackBarConfig): void {
    this.snackbar.open(message, 'Close', {
      duration,
      ...config,
      panelClass: ['snackbar-danger', ...(config?.panelClass ?? [])],
    });
  }

}
