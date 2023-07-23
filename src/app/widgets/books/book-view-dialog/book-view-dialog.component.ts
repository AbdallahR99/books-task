import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '@core/shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '@core/models/book.model';

@Component({
  standalone: true,
  imports: [SharedModule],
  template: `
    <h2 mat-dialog-title>
    <mat-icon fontIcon="book" [inline]="true" class="d-inline-flex"></mat-icon>
    {{ book.title }}
    </h2>
    <mat-divider></mat-divider>

    <mat-dialog-content class="d-flex flex-column gap-3">


      <div class="row align-items-center">
        <div class="col-1 px-0 d-flex">
          <mat-icon fontIcon="event"></mat-icon>
        </div>
        <div class="col-11">
          <p class="mb-0"><strong>Year:</strong> {{ book.year }}</p>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-1 px-0 d-flex">
          <mat-icon fontIcon="person"></mat-icon>
        </div>
        <div class="col-11">
          <p class="mb-0"><strong>Author Name:</strong> {{ book.author }}</p>
        </div>
      </div>

      <div *ngIf="book.collection" class="row align-items-center text-secondary">
        <div class="col-1 px-0 d-flex">
          <mat-icon color="accent" fontIcon="bookmarks"></mat-icon>
        </div>
        <div class="col-11">
          <p class="mb-0"><strong>Collection:</strong> {{ book.collection }}</p>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions class="dialog-actions d-flex justify-content-between">
      <div></div>
      <button mat-button mat-dialog-close>
        Close
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewDialogComponent {
  book: Book = inject(MAT_DIALOG_DATA);
}
