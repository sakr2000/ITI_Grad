import { RouterOutlet } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../Components/loading/loading.component';

@Component({
  selector: 'app-main-system',
  standalone: true,
  imports: [
    SideNavComponent,
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './main-system.component.html',
  styleUrl: './main-system.component.css',
})
export class MainSystemComponent {
  sidebarActive: boolean = false;
  @ViewChild(SideNavComponent) sideNav?: SideNavComponent;
  constructor() {}
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    this.sideNav?.headerToggle();
  }
}
