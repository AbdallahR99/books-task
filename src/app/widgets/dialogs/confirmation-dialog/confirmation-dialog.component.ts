import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '@core/shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  /**
   * @description
   * Bootstrap color of the confirm button and header
   */
  color?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    SharedModule,
  ],
  template: `
    <h2 mat-dialog-title class="text-{{data?.color}}">{{ data?.title || 'Confirmation' }}</h2>
    <div mat-dialog-content>
      <p>{{ data?.message || 'Are you sure you want to proceed?' }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button class="text-{{data?.color}}" (click)="onConfirmClick()">{{ data?.confirmText || 'Confirm' }}</button>
      <button mat-button mat-dialog-close>{{ data?.cancelText || 'Cancel' }}</button>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {


  data?: ConfirmationDialogData = inject(MAT_DIALOG_DATA);
  private dialogRef? = inject(MatDialogRef<ConfirmationDialogComponent>, );

  onConfirmClick(): void {
    this.dialogRef?.close(true);
  }
}
