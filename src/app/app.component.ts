import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddFieldJobComponent } from "./Components/add-field-job/add-field-job.component";
import { AddGovernComponent } from "./Pages/add-govern/add-govern.component";
import { TraderComponent } from "./Components/trader/trader.component";
import { AddOrderComponent } from "./Components/add-order/add-order.component";
import { BranchesComponent } from "./Components/branches/branches.component";
import { CreateBranchComponent } from "./Components/create-branch/create-branch.component";
import { DisplayGovernsComponent } from "./Pages/display-governs/display-governs.component";
import { FieldJobComponent } from "./Components/Fieldjob/FieldJob.component";
import { LoginComponent } from "./Components/login/login.component";
import { MainSystemComponent } from "./Pages/main-system/main-system.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { SideNavComponent } from "./Components/side-nav/side-nav.component";
import { PageHeaderComponent } from "./Components/page-header/page-header.component";
import { TraderDashboardComponent } from "./Components/trader-dashboard/trader-dashboard.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddFieldJobComponent, AddGovernComponent, TraderComponent, AddOrderComponent, BranchesComponent, CreateBranchComponent, DisplayGovernsComponent, FieldJobComponent, LoginComponent, MainSystemComponent, NavbarComponent, SideNavComponent, PageHeaderComponent, TraderDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ITI_Grad';
}
