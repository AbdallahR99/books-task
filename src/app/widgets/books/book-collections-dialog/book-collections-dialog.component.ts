import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SharedModule } from '@core/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterPipe } from '@widgets/_pipes/filter.pipe';
import { BooksService } from '@core/services/books.service';

@Component({
  standalone: true,
  imports: [SharedModule, MatAutocompleteModule, FilterPipe],
  template: `
    <h2 mat-dialog-title class="px-4">Collections</h2>
    <div mat-dialog-content class="d-flex flex-column">

    <mat-form-field>
    <input type="text"
           placeholder="Search"
           matInput
           name="queryString"
           id="queryString"
           maxlength="100"
           (input)="search()"
           [(ngModel)]="queryString">
      <mat-icon matSuffix fontIcon="search"></mat-icon>
    </mat-form-field>


    <div class="p-1"></div>

    <div class="container">
      <div class="row">
        <div class="col-4 mb-3 px-1 px-md-2" *ngFor="let collection of collections() | slice:((pageNumber() - 1) * pageSize()):(pageSize() * pageNumber());  let i = index">
          <button class="card collection-card border-0 mat-elevation-{{card.isHovered ? 'z4' : 'z1'}} w-100 h-100" #card="appHover" appHoverClass  [class.bg-primary]="selectedCollection === collection" (click)="choose(collection)" role="button">
            <div class="card-body p-0 d-flex flex-column position-relative w-100 h-100">
              <mat-icon class="position-absolute" [class.text-white]="selectedCollection === collection" fontIcon="bookmark"></mat-icon>
              <p class="card-text d-flex align-self-center my-auto" [class.text-white]="selectedCollection === collection" [matTooltip]="collection.length > 20 ? collection : ''">{{collection | truncate:20}}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    <ng-container *ngIf="collections().length > pageSize()">

    <div class="d-flex justify-content-between">
      <button mat-button [class.invisible]="!(pageNumber() > 1)" (click)="prevPage()">Previous</button>
      <p class="text-center my-auto d-flex flex-wrap justify-content-center"><span>Page {{pageNumber()}} of {{pageCount()}}</span>&nbsp;<span> - </span>&nbsp;<span>{{ collections().length }} items</span></p>
      <button mat-button [class.invisible]="!(pageNumber() < collections().length / pageSize())" (click)="nextPage()">Next</button>
    </div>
    </ng-container>

    </div>
    <div mat-dialog-actions class="px-3 d-flex justify-content-between">
      <button type="button" mat-button mat-dialog-close>Cancel</button>
    </div>
  `,
  styleUrls: ['./../common/books-collection-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCollectionsDialogComponent {
  selectedCollection: string = inject(MAT_DIALOG_DATA);
  private dialogRef? = inject(MatDialogRef<BookCollectionsDialogComponent>);
  private booksService: BooksService = inject(BooksService);
  pageSize = signal(6);
  pageNumber = signal(1);
  private _queryString = signal('');
  get queryString(): string {
    return this._queryString();
  }
  set queryString(value: string) {
    this._queryString.update(() => value);
  }
  pageCount = computed<number>(() => Math.ceil(this.collections().length / this.pageSize()));
  collections = computed<string[]>(() => [...(this.booksService?.collections() ?? [])].splice(1).filter((collection) => collection.toLowerCase().includes(this._queryString().toLowerCase())));

  choose(collection: string): void {
    this.dialogRef?.close(collection);
  }

  search(): void {
    this.pageNumber.update(() => 1);
  }

  nextPage(): void {
    this.pageNumber.update((page) => page + 1);
  }

  prevPage(): void {
    this.pageNumber.update((page) => page - 1);
  }

}
