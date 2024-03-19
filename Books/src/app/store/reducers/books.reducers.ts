import {createReducer, on, State} from "@ngrx/store";
import * as BooksApiActions from '../actions/books-api.actions'
import {Book} from "../../models/book.model";

export interface BooksState {
  collection: Book[],
  activeBookId: string | null;
}

export const initialState: BooksState = {
  collection: [],
  activeBookId: null,
}

export const bookReducer = createReducer(
  initialState,
  on(BooksApiActions.booksLoaded, (state, action) => {
    return{
      ...state,
      collection: action.books,
    };
  })
);

export const selectAll = (state: BooksState) => state.collection;

