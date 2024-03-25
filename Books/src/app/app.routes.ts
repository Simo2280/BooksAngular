import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {Dashboard} from "./dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
];
