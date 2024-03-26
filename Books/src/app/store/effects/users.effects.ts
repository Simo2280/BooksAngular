import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from "rxjs";
import { TokenService } from "../../services/token-service";
import * as UsersActions from "../actions/users.actions";
import {Router} from "@angular/router";

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions,
              private tokenService: TokenService,
              private router: Router) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.login),
      switchMap(({ email, password, role }) => {
        return this.tokenService
          .login(email, password, role)
          .pipe(map((token) => UsersActions.loginSuccess({ token: token })));
      }),
      catchError((_err) => of(UsersActions.loginFailure({ error: _err.message })))
    )
  });

  saveTokenToLocalstorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loginSuccess),
      tap(({ token }) => {
        sessionStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      })
    );
  }, { dispatch: false });

}
