import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';

import { privilegesComponent } from "./Components/privilege/privileges.component";
import { FieldJobComponent } from './Components/Fieldjob/FieldJob.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HttpClientModule, FieldJobComponent, privilegesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ITI_Grad';
}
