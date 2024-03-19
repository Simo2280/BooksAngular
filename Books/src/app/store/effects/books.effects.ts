import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {concatMap, exhaustMap, map, switchMap} from "rxjs";
import { BookService } from "../../services/book-service";
import * as BooksActions from "../actions/books.actions";
import * as BooksApiActions from "../actions/books-api.actions";

@Injectable()
export class BooksEffects {

  constructor(private actions$: Actions,
              private bookService: BookService) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      exhaustMap(() => {
        return this.bookService
          .getBooks()
          .pipe(map((books) => BooksApiActions.booksLoaded({ books })));
      })
    )
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.createBook),
      switchMap((action) => {
        return this.bookService.createBook(action.newBook).pipe(
          concatMap(() => [
            BooksApiActions.bookCreated(),
            BooksActions.loadBooks()
          ])
        );
      })
    );
  });

}
