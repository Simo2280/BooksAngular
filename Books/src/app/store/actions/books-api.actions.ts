import { createAction, props } from "@ngrx/store";
import {Book} from "../../models/book.model";

export const booksLoaded = createAction(
  '[Books API] Books loaded success',
  props<{ books: Book[] }>()
);

export const bookCreated = createAction(
  '[Books API] Book creation success'
);

