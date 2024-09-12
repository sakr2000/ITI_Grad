import { Routes } from '@angular/router';
import { MainSystemComponent } from './Pages/main-system/main-system.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
  { path: '', component: MainSystemComponent },
  { path: 'login', component: LoginComponent },
];
