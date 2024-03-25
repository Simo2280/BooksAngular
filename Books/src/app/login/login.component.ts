import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BookService} from "../services/book-service";
import {TokenService} from "../services/token-service";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, MatFormField, MatSelect, MatOption, MatButton, MatInput, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  role: string = ''

  constructor(private router: Router, private bookService: BookService, private tokenService: TokenService) {

  }

  onSubmitForm() {
    this.bookService.login(this.email, this.password, this.role).subscribe(
      (response: any) => {
        this.tokenService.saveToken(response);
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Errore durante il login:', error);
      }
    );
  }


}
