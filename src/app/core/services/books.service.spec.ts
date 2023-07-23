import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { Book } from '@core/models/book.model';

describe('BooksService', () => {
  let service: BooksService;
  const book: Book = {
    title: 'Book title',
    author: 'Book author',
    year: 2021,
  } as Book;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksService);
    service.getFromLocalStorage = () => [];
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  },);


  it('should add a book', () => {
    const addedBook = service.add(book);
    console.log(addedBook);

    Object.assign(book, addedBook);
    expect(service.booksRepo()?.find(b => b.title === book.title)).toBeTruthy();
    return console.log('should add a book');

  });

  it('should update a book', () => {
    const updatedBook = Object.assign(new Book(), book);
    updatedBook.title = 'Updated title';
    console.log(updatedBook);

    const afterUpdateBook = service.update(updatedBook);
    Object.assign(book, afterUpdateBook);
    expect(service.booksRepo()?.find(b => b.title === book.title)).toBeTruthy();
    return console.log('should update a book');
  });

  it('should set \'Space\' collection to the book', () => {
    book.collection = 'Space';
    service.setCollection(book, 'Space');
    expect(service.booksRepo()?.find(b => b.id === book.id)?.collection).toBe('Space');
    return console.log('should set \'Space\' collection to the book');
  });

  it('should \'Space\' be exist in collections', () => {
    const collection = service.collections().includes('Space');
    expect(collection).toBeTruthy();
    return console.log('should \'Space\' be exist in collections', collection);

  });

  it('totalCount should be 1', () => {
    const totalCount = service.totalCount();
    expect(totalCount).toBe(1);
    return console.log('totalCount should be 1', totalCount);
  });

  it('should delete a book', () => {
    service.delete(book);
    const isFound = service.booksRepo()?.find(b => b.id === book.id)
    expect(isFound).toBeFalsy();
    return console.log(isFound);
  });
},);
