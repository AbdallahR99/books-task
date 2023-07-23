import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Book } from '@core/models/book.model';
import { BooksService } from '@core/services/books.service';
import { SharedModule } from '@core/shared/shared.module';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Query } from '@core/models/query.model';
import { BooksTableComponent } from '@widgets/books/books-table/books-table.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookCollectionsDialogComponent } from '@widgets/books/book-collections-dialog/book-collections-dialog.component';
import { firstValueFrom } from 'rxjs';
import { BookFormDialogComponent } from '@widgets/books/book-form-dialog/book-form-dialog.component';
import { ResponsiveDirective } from '@widgets/_directives/responsive.directive';
import { SnackbarService } from '@core/services/snackbar.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    SharedModule,
    DragDropModule,
    BooksTableComponent,
    MatPaginatorModule,
    MatChipsModule,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  @HostBinding('class') class =
    'h-100 d-flex flex-column justify-content-center';
  @ViewChild('bookPaginator', { read: MatPaginator })
  bookPaginator?: MatPaginator;
  private booksService = inject(BooksService);
  private snackbarService = inject(SnackbarService);
  dialog = inject(MatDialog);
  dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: false,
  };
  query = signal(new Query());
  queryString = computed(() => this.query()?.queryString ?? '');
  selectedCollection = computed(() => this.query()?.collection ?? '');
  isEmpty = computed(() => this.booksService.totalCount() === 0);
  collectionsSize = 15;
  collectionsSizeMD = 7;
  collectionsSizeSM = 5;
  currentCollectionSize = 0;

  getCurrentCollectionSize(ResponsiveDirective: ResponsiveDirective): number {
    if (ResponsiveDirective.isSM) return this.currentCollectionSize = this.collectionsSizeSM;
    if (ResponsiveDirective.isMD) return this.currentCollectionSize = this.collectionsSizeMD;
    return this.currentCollectionSize = this.collectionsSize;
  }

  get collections(): Signal<string[]> {
    return this.booksService.collections;
  }

  private _filteredBooks = computed(() => {
    this.booksService.booksRepo();
    return this.booksService.query(this.query());
  });

  onDataChange = effect(() => {
    const totalCount = this.totalCount();
    const currentDataLength = this.books()?.length ?? 0;
    if (currentDataLength === 0) {
      const { pageNumber, collection } = this.query();
      if ((pageNumber ?? 0) > 1) {
        setTimeout(() => {  // <--- to call it outside the effect
          this.bookPaginator?.previousPage();
        }, 0);
      }
      if (collection && !totalCount) {
        setTimeout(() => {
          this.query.mutate((q) => ({ ...q, pageSize: 5 }));
          this.selectCollection('');
          this.snackbarService.default('No books found in this collection', 1000);
        }, 300);
      }
    }
    const isLengthLessThanSize =
      totalCount < (this.query()?.pageSize ?? 0);
    if (isLengthLessThanSize) {
      setTimeout(() => {
        if (totalCount > 5)
        this.bookPaginator?._changePageSize(totalCount);
        this.bookPaginator?.lastPage();
      }, 0);
    }


  });

  get books() {
    return this._filteredBooks();
  }

  totalCount = computed(() => {
    this.booksService.booksRepo(); // <--- to trigger the computed on change
    const { queryString, collection } = this.query();
    const books = this.booksService.query({ queryString, collection });
    return books()?.length ?? 0;
  });

  pageSizeOptions = computed<number[]>(() => {
    const options: number[] = [];
    [5, 10, 25, 100].forEach((option) => {
      if (option < this.totalCount()) {
        options.push(option);
      }
    });
    options.push(this.totalCount());
    return options;
  });

  drop(event: CdkDragDrop<Book[]>): void {
    const distance = event.currentIndex - event.previousIndex;
    const currentBook = this.books()[event.previousIndex];
    const books = this.booksService.getAll();
    const currentIndex = books().indexOf(currentBook);
    const newIndex = currentIndex + distance;
    moveItemInArray(books(), currentIndex, newIndex);
    this.booksService.setList(books());
  }

  deleteBook(book: Book): void {
    this.booksService.delete(book);
  }

  search(keyword = ''): void {
    this.query.update((query) => ({
      ...query,
      queryString: keyword ?? '',
      pageNumber: 1,
    }));
  }

  selectCollection(collection: string): void {
    this.query.update((query) => ({ ...query, collection: collection ?? '', pageNumber: 1}));
  }

  handlePageEvent(e: PageEvent) {
    this.query.update((q) => {
      q.pageSize = e.pageSize;
      q.pageNumber = e.pageIndex + 1;
      return q;
    });
  }
  addToCollections(book: Book, collection = ''): void {
    this.booksService.setCollection(book, collection?.trim());
  }

  async selectFromCollections(): Promise<void> {
    const selectedCollection = await this.openCollectionsDialog();
    if (!selectedCollection) return;
    this.selectCollection(selectedCollection);
    const collectionIndex = this.collections()?.indexOf(selectedCollection);
    if (collectionIndex < this.currentCollectionSize) return;
    moveItemInArray(this.collections(), collectionIndex, (this.currentCollectionSize-1));
  }

  async addBook(): Promise<void> {
    await this.openBookFormDialog();
    this._filteredBooks = computed(() => this.booksService.query(this.query()));
  }

  openCollectionsDialog(): Promise<string | undefined> {
    return firstValueFrom(
      this.dialog
        .open<BookCollectionsDialogComponent, string>(
          BookCollectionsDialogComponent,
          {
            ...this.dialogConfig,
            data: this.selectedCollection(),
          }
        )
        .afterClosed()
    );
  }

  openBookFormDialog(): Promise<Book | undefined> {
    return firstValueFrom(
      this.dialog
        .open<BookFormDialogComponent, Book>(BookFormDialogComponent, {
          ...this.dialogConfig,
          data: {
            collection: this.selectedCollection(),
          } as Book,
        })
        .afterClosed()
    );
  }
}
