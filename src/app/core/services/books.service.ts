import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { StorageKeys } from '@core/constants/storage-keys';
import { Book } from '@core/models/book.model';
import { Query } from '@core/models/query.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  readonly booksRepo = signal<Book[]>([]);

  totalCount = computed(() => this.booksRepo()?.length ?? 0);
  collections = computed<string[]>(() => {
    return [
      ...new Set([
        '',
        ...(this.booksRepo()?.map((book) => book.collection ?? '') ?? []),
      ]),
    ]
  });
  constructor() {
    this.setList(this.getFromLocalStorage());
    this._autoSaveInLocalStorage();
  }

  add(book: Book): Book {
    book.createdAt = new Date();
    book.id = uuid.v4();
    this.booksRepo.update((books) => [...books, book]);
    return book;
  }

  delete(id: string): void;
  delete(book: Book): void;
  delete(bookOrId: Book | string): void {
    const id = typeof bookOrId === 'string' ? bookOrId : bookOrId.id;
    this.booksRepo.update((books) => books.filter((book) => book.id !== id));
  }
  update(book: Book): Book {
    book.updatedAt = new Date();
    this.booksRepo.update((books) =>
      books.map((b) => (b.id === book.id ? book : b))
    );
    return book;
  }

  get(id: string): Signal<Book | undefined> {
    return computed(() => this.booksRepo()?.find((book) => book.id === id));
  }

  getAll(collection = ''): Signal<Book[]> {
    if (collection) return this.getByCollection(collection);
    return this.booksRepo;
  }

  setList(books: Book[]): void {
    this.booksRepo.set(books);
  }

  query({queryString = '', collection = '', ...query }: Partial<Query>): Signal<Book[]> {
    return computed(() => {
    this.booksRepo();
    const book = this.getAll(collection)
    return this.paginate(queryString?.trim() === ''
        ? book()
        : book()?.filter(
            (book) =>
            queryString.split(' ').every(
              (query) => [book.title, book.author, book.year?.toString(), book.collection].join(' ').toLowerCase()
                .includes(query.toLowerCase()),
            )

          ) ?? [], query as Query)},
    );
  }

  paginate(books: Book[], { pageNumber, pageSize }: Partial<Query>): Book[] {
    if (!pageNumber || !pageSize) return books;
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return books?.slice(start, end);
  }

  setCollection(book: Book, collection: string): Book {
    book.collection = collection;
    return this.update(book);
  }

  getByCollection(collection = ''): Signal<Book[]> {
    return computed<Book[]>(() =>
      this.booksRepo()?.filter((book) => book.collection === collection),
    );
  }

  dummyData(): void {
    const collections: string[] = [
      'Fiction',
      'Non-Fiction',
      'Mystery',
      'Fantasy',
      'Romance',
      'Science Fiction',
      'History',
      'Biography',
      'Self-Help',
      'Thriller',
      'Poetry',
      'Cooking',
      'Art',
      'Travel',
      'Health',
      'Business',
      'Philosophy',
      'Religion',
      'Children',
      'Comics',
    ];
    const books: Book[] = [];
    for (let i = 0; i < 100; i++) {
      const randomCollection = collections[Math.floor(Math.random() * collections.length)];
      const n = (i + 1) + this.totalCount();
      const book: Book = {
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        title: `Book ${n}`,
        year: 1900 + Math.floor(Math.random() * 124),
        author: `Author ${n}`,
        collection: randomCollection,
      };

      books.push(book);
    }
    this.booksRepo.update((value) => [...value, ...books]);
  }

  clearAll(): void {
    this.booksRepo.set([]);
  }

  getFromLocalStorage(): Book[] {
    const books = localStorage.getItem(StorageKeys.BOOKS_REPOSITORY);
    return books ? JSON.parse(books) : [];
  }
  private _autoSaveInLocalStorage(): void {
    effect(() => {
      localStorage.setItem(
        StorageKeys.BOOKS_REPOSITORY,
        JSON.stringify(this.booksRepo())
      );
    });
  }
}
