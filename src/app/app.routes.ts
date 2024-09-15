import { Routes } from '@angular/router';
import { privilegesComponent } from './Components/privilege/privileges.component';

export const routes: Routes = [
    { path: 'view-field-job/:id', component:privilegesComponent },
];
