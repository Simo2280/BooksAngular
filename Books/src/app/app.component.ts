import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Book} from "./models/book.model";
import {BookService} from "./services/book-service";
import {Store} from "@ngrx/store";
import * as BooksActions from './store/actions/books.actions'
import * as BooksApiActions from './store/actions/books-api.actions'
import {Observable} from "rxjs";
import { selectAllBooks } from './store/selectors/books.selectors';
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books$: Observable<Book[]>
  newBook: Book = { ISBN: '', title: '', author: '', genre: '', publishedYear: 0 };
  flagCreate: boolean = false;

  constructor(private booksService: BookService, private store: Store) {
    this.books$ = store.select(selectAllBooks);
  }

  ngOnInit() {
    //this.getBooks();
    this.store.dispatch(BooksActions.loadBooks());
  }

  onFlagCreate() {
    this.flagCreate = !this.flagCreate;
  }

  getBooks() {
    this.booksService.getBooks().subscribe((books) => {
      this.store.dispatch(BooksApiActions.booksLoaded({ books } ));
      console.log(books)
    });
  }

  onCreateBook() {
    this.store.dispatch(BooksActions.createBook({newBook: this.newBook}));
  }

}
