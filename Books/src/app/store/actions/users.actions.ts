import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Login] User Login',
  props<{ email: string, password: string, role: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
