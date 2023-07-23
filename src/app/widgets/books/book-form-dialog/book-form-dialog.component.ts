import { Component, computed, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Constants } from '@core/constants/constants';
import { Book } from '@core/models/book.model';
import { BooksService } from '@core/services/books.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { SharedModule } from '@core/shared/shared.module';
import { NumberValidationDirective } from '@widgets/_directives/number-validation.directive';
import { FilterPipe } from '@widgets/_pipes/filter.pipe';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [SharedModule, NumberValidationDirective, MatAutocompleteModule, FilterPipe],
  template: `
    <h2 mat-dialog-title class="px-4">{{ isEdit ? 'Edit' : 'Add' }} Book</h2>
    <form #bookForm="ngForm" (ngSubmit)="submit(bookForm)">
    <div mat-dialog-content class="d-flex flex-column gap-3">

        <mat-form-field>
          <mat-label
            > Book Title</mat-label
          >
          <input
            type="text"
            matInput
            name="title"
            maxlength="100"
            [(ngModel)]="book.title"
            #title="ngModel"
            required
            placeholder="etc. The Hobbit"
          />
          <span matTextSuffix><mat-icon fontIcon="book"></mat-icon></span>
          <mat-error
            *ngIf="
              title.invalid &&
              (title.dirty || title.touched || bookForm.submitted)
            "
          >
            Book title is required.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Year</mat-label>
          <input
            appNumberValidation
            type="number"
            matInput
            name="year"
            [(ngModel)]="book.year"
            #year="ngModel"
            [maxLength]="4"
            [maxValue]="currentYear"
            required
            placeholder="etc. 2021"

          />
          <span matTextSuffix><mat-icon fontIcon="event"></mat-icon></span>
          <mat-error
            *ngIf="
              year.invalid && (year.dirty || year.touched || bookForm.submitted)
            "
          >
            Please enter a valid year.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label
            >Author Name</mat-label
          >
          <input
            type="text"
            matInput
            name="author"
            maxlength="100"
            [(ngModel)]="book.author"
            #author="ngModel"
            required
            placeholder="etc. J.R.R. Tolkien"
          />
          <span matTextSuffix><mat-icon fontIcon="person"></mat-icon> </span>
          <mat-error
            *ngIf="
              author.invalid &&
              (author.dirty || author.touched || bookForm.submitted)
            "
          >
            Author name is required.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label
            >Collection Name</mat-label
          >
          <input
            type="text"
            matInput
            name="collection"
            maxlength="100"
            [(ngModel)]="book.collection"
            #collection="ngModel"
            placeholder="etc. Best books in Spanish"
            [matAutocomplete]="collectionAuto"
          />
          <mat-autocomplete #collectionAuto="matAutocomplete">
        <mat-option *ngFor="let option of collections() | filter:collection.value" [value]="option">
          {{option}}
        </mat-option>
      </mat-autocomplete>
          <span matTextSuffix><mat-icon fontIcon="bookmarks"></mat-icon> </span>
          <mat-error
            *ngIf="
              author.invalid &&
              (author.dirty || author.touched || bookForm.submitted)
            "
          >
            Author name is required.
          </mat-error>
        </mat-form-field>

    </div>

    <div mat-dialog-actions class="px-3">
      <button type="submit" mat-raised-button color="primary">
        {{ isEdit ? 'Create' : 'Save' }}
      </button>
      <button type="button" mat-button mat-dialog-close>Cancel</button>
    </div>
    </form>
  `,
  styles: [],
})
export class BookFormDialogComponent {
  isEdit: boolean;
  currentYear: number = new Date().getFullYear();
  book: Book = Object.assign(
    new Book(),
    JSON.parse(JSON.stringify(inject(MAT_DIALOG_DATA) ?? {}))
  );
  private dialogRef? = inject(MatDialogRef<BookFormDialogComponent>);
  private booksService = inject(BooksService);
  private snackbarService = inject(SnackbarService);
  collections = computed<string[]>(() => [...(this.booksService?.collections() ?? [])].splice(1));
  constructor() {
    if (!this.book || !this.book.id || this.book.id === Constants.DEFAULT_UUID) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.isEdit) {
      this.booksService.update(this.book);
      this.snackbarService.success('Book updated successfully');
    } else {
      this.booksService.add(this.book);
      this.snackbarService.success('Book added successfully');
    }
    this.dialogRef?.close({ data: this.book });
  }
}
