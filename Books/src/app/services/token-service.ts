import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  saveToken(token: any) {
    console.log(token.accessToken)
    this.cookieService.set('token', token.accessToken);
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  clearToken() {
    this.cookieService.delete('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
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
