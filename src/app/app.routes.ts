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
      {
        path: 'FieldJob',
        loadComponent: () =>
          import('./Components/Fieldjob/FieldJob.component').then(
            (m) => m.FieldJobComponent
          ),
      },
      {
        path: 'Branch',
        loadComponent: () =>
          import('./Components/branches/branches.component').then(
            (m) => m.BranchesComponent
          ),
      },
      {
        path: 'Branch/edit/:id',
        loadComponent: () =>
          import('./Components/create-branch/create-branch.component').then(
            (m) => m.CreateBranchComponent
          ),
      },
      {
        path: 'Branch/add',
        loadComponent: () =>
          import('./Components/create-branch/create-branch.component').then(
            (m) => m.CreateBranchComponent
          ),
      },
      {
        path: 'Order',
        loadComponent: () =>
          import('./Components/add-order/add-order.component').then(
            (m) => m.AddOrderComponent
          ),
      },
      {
        path: 'Sellers',
        loadComponent: () =>
          import(
            './Components/seller/display-sellers/display-sellers.component'
          ).then((m) => m.DisplaySellersComponent),
      },
      {
        path: 'Sellers/add',
        loadComponent: () =>
          import('./Components/seller/add-seller/trader.component').then(
            (m) => m.TraderComponent
          ),
      },
      {
        path: 'Employees',
        loadComponent: () =>
          import(
            './Components/display-employees/display-employees.component'
          ).then((m) => m.DisplayEmployeesComponent),
      },
      {
        path: 'Employees/add',
        loadComponent: () =>
          import(
            './Components/employee/add-employee/add-employee.component'
          ).then((m) => m.AddEmployeeComponent),
      },
      {
        path: 'Agents',
        loadComponent: () =>
          import(
            './Components/agent/display-agents/display-agents.component'
          ).then((m) => m.DisplayAgentsComponent),
      },
      {
        path: 'Agents/add',
        loadComponent: () =>
          import('./Components/agent/add-agent/add-agent.component').then(
            (m) => m.AddAgentComponent
          ),
      },
      {
        path: 'Agents/edit/:id',
        loadComponent: () =>
          import('./Components/agent/add-agent/add-agent.component').then(
            (m) => m.AddAgentComponent
          ),
      },
      {
        path: 'Settings',
        loadComponent: () =>
          import('./Pages/settings-page/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
