import { createAction, props } from "@ngrx/store";
import {Book} from "../../models/book.model";

export const loadBooks = createAction(
  '[App Component] Loading books'
);

export const createBook = createAction(
  '[App Component] Create a book',
  props<{ newBook: Book }>()
);


