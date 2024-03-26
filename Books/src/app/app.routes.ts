import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {Dashboard} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
];
