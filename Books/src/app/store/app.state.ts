import {userInitialState, UserState} from "./reducers/users.reducers";
import {bookInitialState, BooksState} from "./reducers/books.reducers";

export interface State {
  UserState: UserState,
  BookState: BooksState
}

export const initialState: State = {
    UserState: userInitialState,
    BookState: bookInitialState
}
