import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '@core/models/book.model';
import { BooksService } from '@core/services/books.service';
import { SharedModule } from '@core/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterPipe } from '@widgets/_pipes/filter.pipe';
import { SnackbarService } from '@core/services/snackbar.service';

@Component({
  standalone: true,
  imports: [SharedModule, MatAutocompleteModule, FilterPipe],
  template: `
    <h2 mat-dialog-title class="px-4">Add To collection</h2>
    <div mat-dialog-content class="d-flex flex-column">
      <form ngForm (ngSubmit)="save()" class="d-flex flex-column">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input
            type="text"
            placeholder="etc. Best books in Spanish"
            matInput
            name="collection"
            id="collection"
            maxlength="100"
            [(ngModel)]="book.collection"
            #collection="ngModel"
            [matAutocomplete]="collectionAuto"
          />
          <span matTextSuffix><mat-icon fontIcon="bookmarks"></mat-icon> </span>
          <mat-autocomplete #collectionAuto="matAutocomplete">
            <mat-option
              *ngFor="let option of collections() | filter : collection.value"
              [value]="option"
            >
              {{ option }}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </form>

      <p class="text-center">Or Select From Here:</p>
      <div class="p-1"></div>

      <div class="container">
        <div class="row">
          <div
            class="col-4 mb-3 px-1 px-md-2"
            *ngFor="
              let collection of collections()
                | slice
                  : (pageNumber() - 1) * pageSize()
                  : pageSize() * pageNumber();
              let i = index
            "
          >
            <button
              class="card collection-card border-0 mat-elevation-{{
                card.isHovered ? 'z4' : 'z1'
              }} w-100 h-100"
              #card="appHover"
              appHoverClass="text-secondary"
              (click)="choose(collection)"
              role="button"
            >
              <div
                class="card-body p-0 d-flex flex-column position-relative w-100 h-100"
              >
                <mat-icon
                  class="position-absolute"
                  fontIcon="bookmark"
                ></mat-icon>
                <p
                  class="card-text d-flex align-self-center my-auto"
                  [matTooltip]="collection.length > 20 ? collection : ''"
                >
                  {{ collection | truncate : 20 }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <ng-container *ngIf="collections().length > pageSize()">
        <!-- <div class="p-3"></div> -->

        <div class="d-flex justify-content-between">
          <button
            mat-button
            [class.invisible]="!(pageNumber() > 1)"
            (click)="prevPage()"
          >
            Previous
          </button>
          <p
            class="text-center my-auto d-flex flex-wrap justify-content-center"
          >
            <span>Page {{ pageNumber() }} of {{ pageCount() }}</span>
            <span> - </span> <span>{{ collections().length }} items</span>
          </p>
          <button
            mat-button
            [class.invisible]="
              !(pageNumber() < collections().length / pageSize())
            "
            (click)="nextPage()"
          >
            Next
          </button>
        </div>
      </ng-container>
    </div>
    <div mat-dialog-actions class="px-3 d-flex justify-content-between">
      <button type="button" color="primary" mat-raised-button (click)="save()">
        Save
      </button>
      <button type="button" mat-button mat-dialog-close>Cancel</button>
    </div>
  `,
  styleUrls: ['./../common/books-collection-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAddCollectionDialogComponent {
  book: Book = Object.assign(
    new Book(),
    JSON.parse(JSON.stringify(inject(MAT_DIALOG_DATA)))
  );

  private snackbarService = inject(SnackbarService);
  private dialogRef? = inject(MatDialogRef<BookAddCollectionDialogComponent>);
  private booksService: BooksService = inject(BooksService);
  pageSize = signal(6);
  pageNumber = signal(1);
  pageCount = computed<number>(() =>
    Math.ceil(this.collections().length / this.pageSize())
  );
  collections = computed<string[]>(() =>
    [...(this.booksService?.collections() ?? [])].splice(1)
  );

  choose(collection: string): void {
    this.book.collection = collection;
    this.save();
  }

  nextPage(): void {
    this.pageNumber.update((page) => page + 1);
  }

  prevPage(): void {
    this.pageNumber.update((page) => page - 1);
  }

  save(): void {
    this.booksService.update(this.book);
    this.snackbarService.success(`Book added to collection: ${this.book.collection}`);
    this.dialogRef?.close(this.book);
  }
}
