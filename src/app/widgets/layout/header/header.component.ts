import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { Constants } from '@core/constants/constants';
import { BooksService } from '@core/services/books.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="d-flex justify-content-between">
     <div>
     <a href="" class="text-decoration-none d-flex text-primary d-flex align-items-center">
        <mat-icon svgIcon="logo" [appSize]="40" class="d-inline-flex"></mat-icon>
        <div class="px-1"></div>
        <span> {{title | titlecase }} </span>
      </a>
     </div>
     <div class="">
        <button mat-button (click)="booksService.dummyData()">
          Dummy Data
        </button>
        <button mat-button (click)="booksService.clearAll()">
          Clear All
        </button>
     </div>

  </mat-toolbar>
  `,
  styles: [
  ],
  exportAs: 'appHeader',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewChecked {
  booksService = inject(BooksService);
  title = Constants.APP_NAME;
  private readonly header = inject(ElementRef);
  viewChecked = false;
  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (!this.viewChecked) {
        this.viewChecked = true;
      }
    }, 100);

  }


  get headerHeight(): number {
    if (!this.viewChecked) {
      return 0;
    }
    return this.header?.nativeElement.offsetHeight || 0;
  }
}
