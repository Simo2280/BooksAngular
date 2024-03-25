import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {TokenService} from "../../services/token-service"; // Importa il servizio TokenService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (!token || this.tokenService.isTokenExpired()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
