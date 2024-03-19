import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Book} from "./models/book.model";
import {Store} from "@ngrx/store";
import * as BooksActions from './store/actions/books.actions'
import {Observable} from "rxjs";
import { selectAllBooks } from './store/selectors/books.selectors';
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {selectActiveBook} from "./store/selectors/books.selectors";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books$: Observable<Book[]>
  activeBook$: Observable<Book | null>
  newBook: Book = { ISBN: '', title: '', author: '', genre: '', publishedYear: 2000 };
  editBook: Book = { ISBN: '', title: '', author: '', genre: '', publishedYear: 2000 };
  flagActiveBook: boolean = false;
  flagCreate: boolean = false;
  flagUpdate: boolean = false;

  constructor(private store: Store) {
    this.books$ = store.select(selectAllBooks);
    this.activeBook$ = store.select(selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksActions.loadBooks());
  }

  onFlagCreate() {
    this.flagCreate = !this.flagCreate;
  }

  onFlagActive() {
    this.flagActiveBook = false;
  }

  onFlagUpdateTrue(book: Book) {
    this.editBook.ISBN = book.ISBN;
    this.flagUpdate = true;
  }

  onFlagUpdateFalse() {
    this.flagUpdate = false;
  }

  onGetBook(isbnActive: string) {
    this.store.dispatch(BooksActions.loadActiveBook({ ISBN: isbnActive }));
    this.flagActiveBook = true;
  }

  onCreateBook() {
    this.store.dispatch(BooksActions.createBook({ newBook: this.newBook }));
    this.newBook = { ISBN: '', title: '', author: '', genre: '', publishedYear: 2000 };
  }

  onUpdateBook() {
    this.store.dispatch(BooksActions.updateBook({ editBook: this.editBook }))
  }

  onDeleteBook(isbn: string) {
    this.store.dispatch(BooksActions.deleteBook({ isbn: isbn }));
  }

}
