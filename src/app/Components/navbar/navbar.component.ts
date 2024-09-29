import { Component, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter();
  toggleSidebar(icon: HTMLElement) {
    this.sidebarToggle.emit();
  }
}
