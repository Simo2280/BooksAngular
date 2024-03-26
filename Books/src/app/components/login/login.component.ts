import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Store} from "@ngrx/store";
import * as UsersActions from '../../store/actions/users.actions'
import {selectError, selectIsLoading, selectToken} from "../../store/selectors/users.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, MatFormField, MatSelect, MatOption, MatButton, MatInput, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  role: string = '';
  token$: Observable<string>;

  constructor(private store: Store, private router: Router) {
    this.token$ = store.select(selectToken)
  }

  ngOnInit(): void {
    this.token$.subscribe(token => {
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmitForm() {
    this.store.dispatch(UsersActions.login({email: this.email, password: this.password, role: this.role}))
  }


}
