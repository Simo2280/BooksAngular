import {createReducer, on} from "@ngrx/store";
import * as UsersActions from '../actions/users.actions'

export interface UserState {
  token: string | null;
  isLoading: boolean,
  error: string | null
}

export const userInitialState: UserState = {
  token: null,
  isLoading: false,
  error: null
}

export const loginReducer = createReducer(userInitialState,
  on(UsersActions.login, state => ({ ...state, isLoading: true })),
  on(UsersActions.loginSuccess, (state, { token }) => ({ ...state, token, isLoading: false })),
  on(UsersActions.loginFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);
