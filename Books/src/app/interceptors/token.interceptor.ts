/*import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {TokenService} from "../services/token-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/refresh')) {
          return this.tokenService.refreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.tokenService.getToken()}`
                }
              });
              return next.handle(newRequest);
            }),
            catchError((err) => {
              // Handle refresh token failure
              this.tokenService.logout(); // or redirect to login page
              return throwError(err);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}/*

*/
