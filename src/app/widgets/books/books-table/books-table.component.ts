import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Book } from '@core/models/book.model';
import { SharedModule } from '@core/shared/shared.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@widgets/dialogs/confirmation-dialog/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { BooksService } from '@core/services/books.service';
import { BookAddCollectionDialogComponent } from '../book-add-collection-dialog/book-add-collection-dialog.component';
import { BookViewDialogComponent } from '../book-view-dialog/book-view-dialog.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule } from '@angular/material/core';
import { DOCUMENT } from '@angular/common';
import { SnackbarService } from '@core/services/snackbar.service';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [
    SharedModule,
    MatTableModule,
    DragDropModule,
    MatBottomSheetModule,
    MatRippleModule,
  ],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksTableComponent {
  private booksService = inject(BooksService);
  private document: Document = inject(DOCUMENT);
  private bottomSheet = inject(MatBottomSheet);
  private snackbarService = inject(SnackbarService);

  @ViewChild(MatTable) table?: MatTable<Book[]>;
  @Input() books: Book[] = [];
  @Output() dropped = new EventEmitter<CdkDragDrop<Book[]>>();

  dialog = inject(MatDialog);
  dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: false,
  };

  displayedColumns: string[] = [
    'position',
    'bookTitle',
    'year',
    'authorName',
    'actions',
  ];

  drop(event: CdkDragDrop<Book[]>): void {
    this.dropped.emit(event);
    this.table?.renderRows();
  }

  async removeFromCollections(book: Book): Promise<void> {
    const isConfirmed = await this.confirmationDialog({
      title: 'Remove from collections',
      message: `Are you sure you want to remove ${book?.title} from collections?`,
      confirmText: 'Remove',
      color: 'danger',
    });
    if (!isConfirmed) return;
    this.booksService.update({ ...book, collection: '' });
    this.snackbarService.success(`Book removed from collections`);
  }

  async deleteBook(book: Book): Promise<void> {
    const isConfirmed = await this.confirmationDialog({
      title: 'Delete book',
      message: `Are you sure you want to delete ${book?.title}?`,
      confirmText: 'Delete',
      color: 'danger',
    });
    if (!isConfirmed) return;
    this.booksService.delete(book);
    this.snackbarService.success(`Book deleted`);
  }

  addToCollections(book: Book): void {
    this.openCollectionsDialog(book);
  }

  edit(book: Book): void {
    this.openBookFormDialog(book);
  }

  view(book: Book): void {
    this.openViewDialog(book);
  }

  openViewDialog(data?: Book): void {
    this.dialog.open<BookViewDialogComponent, Book>(BookViewDialogComponent, {
      ...this.dialogConfig,
      data,
    });
  }

  openCollectionsDialog(data?: Book): void {
    this.dialog.open<BookAddCollectionDialogComponent, Book>(
      BookAddCollectionDialogComponent,
      {
        ...this.dialogConfig,
        data,
      }
    );
  }

  openBookFormDialog(data?: Book): void {
    this.dialog.open<BookFormDialogComponent, Book>(BookFormDialogComponent, {
      ...this.dialogConfig,
      data,
    });
  }
  async confirmationDialog(
    data: ConfirmationDialogData
  ): Promise<boolean | undefined> {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData>(
      ConfirmationDialogComponent,
      {
        ...this.dialogConfig,
        data,
      }
    );
    if (!dialogRef) return;

    return firstValueFrom(dialogRef.afterClosed() );
  }

  openBottomSheet(book: Book, temp: TemplateRef<HTMLElement>): void {
    const width = this.document.body.clientWidth;
    if (width < 768) {
      this.bottomSheet.open(temp, {
        data: book,

      });
    }
  }

  closeBottomSheet(): void {
    this.bottomSheet.dismiss();
  }


}
