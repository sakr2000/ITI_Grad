import { Routes } from '@angular/router';
import { MainSystemComponent } from './Pages/main-system/main-system.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainSystemComponent,
    children: [
      {
        path: 'Govern',
        loadComponent: () =>
          import('./Pages/display-governs/display-governs.component').then(
            (m) => m.DisplayGovernsComponent
          ),
      },
      {
        path: 'Govern/add',
        loadComponent: () =>
          import('./Pages/add-govern/add-govern.component').then(
            (m) => m.AddGovernComponent
          ),
      },
      {
        path: 'Govern/edit/:id',
        loadComponent: () =>
          import('./Pages/add-govern/add-govern.component').then(
            (m) => m.AddGovernComponent
          ),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
