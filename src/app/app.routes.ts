import { Routes } from '@angular/router';
import { MainSystemComponent } from './Pages/main-system/main-system.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { privilegeGuard } from './Guards/privilege.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainSystemComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './Components/trader-dashboard/trader-dashboard.component'
          ).then((m) => {
            return m.TraderDashboardComponent;
          }),
      },
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
        canActivate: [privilegeGuard],
        data: {
          entity: 'المحافظات',
          action: 'add',
        },
      },
      {
        path: 'Govern/edit/:id',
        loadComponent: () =>
          import('./Pages/add-govern/add-govern.component').then(
            (m) => m.AddGovernComponent
          ),
        canActivate: [privilegeGuard],
        data: {
          entity: 'المحافظات',
          action: 'edit',
        },
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
        canActivate: [privilegeGuard],
        data: {
          entity: 'الفروع',
          action: 'add',
        },
      },
      {
        path: 'Order',
        loadComponent: () =>
          import('./Components/view-order/view-order.component').then(
            (m) => m.ViewOrderComponent
          ),
      },
      {
        path: 'Order/Report',
        loadComponent: () =>
          import('./Components/report/report.component').then(
            (m) => m.ReportComponent
          ),
      },
      {
        path: 'Order/add',
        loadComponent: () =>
          import('./Components/add-order/add-order.component').then(
            (m) => m.AddOrderComponent
          ),
        canActivate: [privilegeGuard],
        data: {
          entity: 'الطلبات',
          action: 'add',
        },
      },
      {
        path: 'Order/edit/:orderId',  // Edit order route with orderId parameter
        loadComponent: () =>
          import('./Components/add-order/add-order.component').then(
            (m) => m.AddOrderComponent
          ),
        canActivate: [privilegeGuard],
        data: {
          entity: 'الطلبات',
          action: 'edit',
        },
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
        canActivate: [privilegeGuard],
        data: {
          entity: 'التجار',
          action: 'add',
        },
      },
      {
        path: 'Employees',
        loadComponent: () =>
          import(
            './Components/employee/display-employees/display-employees.component'
          ).then((m) => m.DisplayEmployeesComponent),
      },
      {
        path: 'Employees/add',
        loadComponent: () =>
          import(
            './Components/employee/add-employee/add-employee.component'
          ).then((m) => m.AddEmployeeComponent),
        canActivate: [privilegeGuard],
        data: {
          entity: 'الموظفين',
          action: 'add',
        },
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
        canActivate: [privilegeGuard],
        data: {
          entity: 'المناديب',
          action: 'add',
        },
      },
      {
        path: 'Agents/edit/:id',
        loadComponent: () =>
          import('./Components/agent/add-agent/add-agent.component').then(
            (m) => m.AddAgentComponent
          ),
        canActivate: [privilegeGuard],
        data: {
          entity: 'المناديب',
          action: 'edit',
        },
      },
      {
        path: 'Settings',
        loadComponent: () =>
          import('./Pages/settings-page/settings.component').then(
            (m) => m.SettingsComponent
          ),
        canActivate: [privilegeGuard],
        data: {
          entity: 'Settings',
          action: 'view',
        },
      },
    ],
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
];
