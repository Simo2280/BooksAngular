import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {TokenService} from "../services/token-service"; // Importa il servizio TokenService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token || this.tokenService.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
