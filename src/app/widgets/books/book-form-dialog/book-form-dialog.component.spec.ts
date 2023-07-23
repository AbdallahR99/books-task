// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BookFormDialogComponent } from './book-form-dialog.component';
// import { SharedModule } from '@core/shared/shared.module';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { NumberValidationDirective } from '@widgets/_directives/number-validation.directive';
// import { FilterPipe } from '@widgets/_pipes/filter.pipe';
// import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { BooksService } from '@core/services/books.service';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// describe('BookFormComponent', () => {
//   let component: BookFormDialogComponent;
//   let fixture: ComponentFixture<BookFormDialogComponent>;
//   let booksService: BooksService;
//   const matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

//   // beforeAll(() => {
//   //   TestBed.configureTestingModule({
//   //     imports: [BooksService],
//   //   });
//   // })

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [BookFormDialogComponent, SharedModule, NumberValidationDirective, MatAutocompleteModule, FilterPipe, NoopAnimationsModule],

//       providers: [
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: booksService,
//         },
//         {
//           provide: MatDialogRef,
//           useValue: matDialogSpy,
//         }
//       ]
//     }).compileComponents();
//     fixture = TestBed.createComponent(BookFormDialogComponent);
//     component = fixture.componentInstance;
//     booksService = TestBed.inject(BooksService);

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });


//   // it('should create a book' , () => {
//   //   expect(component).toBeTruthy();
//   //   fixture.nativeElement.querySelector('[name=title]').value = 'test';
//   //   fixture.nativeElement.querySelector('[name=author]').value = 'test';
//   //   fixture.nativeElement.querySelector('[name=year]').value = 2004;
//   //   fixture.detectChanges();
//   //   expect(component?.book?.title).toBe('test');
//   //   fixture.nativeElement.querySelector('[type=submit]').click();
//   //   // expect(booksService.booksRepo().length).toBe(1);


//   // });
// });
