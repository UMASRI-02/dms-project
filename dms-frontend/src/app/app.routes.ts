import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: LoginComponent },       // 👈 default page = login
  { path: 'dashboard', component: DashboardComponent }

];