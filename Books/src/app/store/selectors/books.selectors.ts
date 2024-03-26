import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromBooks from '../reducers/books.reducers'
import { State } from '../app.state'

export const selectBooksState = (state: any) => state;
export const selectAllBooks =
  createSelector(
    selectBooksState,
    fromBooks.selectAll
  )

export const selectActiveBook =
  createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
  )
