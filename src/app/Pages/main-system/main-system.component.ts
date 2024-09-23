import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-system',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './main-system.component.html',
  styleUrl: './main-system.component.css',
})
export class MainSystemComponent {
  toggled: boolean = false;

  constructor() {}
  toggleSidebar() {
    this.toggled = !this.toggled;
  }
}
