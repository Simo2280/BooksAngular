import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<string> {
    const headers = new HttpHeaders()
      .set('email', email)
      .set('password', password)
      .set('role', role);

    return this.http.get<any>('http://localhost:4000/login', { headers }).pipe(
      map(response => response.accessToken)
    );
  }

  logout(): Observable<Object> {
    const token = sessionStorage.getItem("token");

    if (token) {
      const headers = new HttpHeaders()
        .set('authorization', token);

      return this.http.get("http://localhost:4000/logout", { headers: headers });
    } else {
      return throwError("Nessun token presente in sessionStorage");
    }
  }

  refresh(): Observable<Object> {

    return this.http.get("http://localhost:4000/refresh");
  }

  clearToken() {
    this.cookieService.delete('token');
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const tokenPayload = this.parseJwt(token);
    if (!tokenPayload || !tokenPayload.exp) {
      return true;
    }

    const expirationDate = new Date(tokenPayload.exp * 1000);
    return expirationDate <= new Date();
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }

}
