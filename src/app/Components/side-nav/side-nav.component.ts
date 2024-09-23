import { AuthenticationService } from './../../Services/authentication.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserOptionsService } from '../../Services/user-options.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('headerToggleBtn') headerToggleBtn!: ElementRef;

  constructor(
    private _options: UserOptionsService,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  get username(): string {
    return (this._options.getUserData()?.userName as string) || '';
  }
  headerToggle() {
    this.header.nativeElement.classList.toggle('header-show');
    this.headerToggleBtn.nativeElement.classList.toggle('bi-list');
    this.headerToggleBtn.nativeElement.classList.toggle('bi-x');
  }
  toggleDropdown(e: Event, element: HTMLElement) {
    e.preventDefault();
    element.parentElement?.classList.toggle('active');
    element.parentElement?.nextElementSibling?.classList.toggle(
      'dropdown-active'
    );
    e.stopImmediatePropagation();
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
        sessionStorage.clear();
        localStorage.clear();
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
  }
}
