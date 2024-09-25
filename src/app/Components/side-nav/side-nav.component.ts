import { AuthenticationService } from './../../Services/authentication.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserDataService } from '../../Services/userData.service';
import { CommonModule } from '@angular/common';
import { FieldPrivilegeDTO } from '../../Models/FieldJob';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('headerToggleBtn') headerToggleBtn!: ElementRef;
  privileges: FieldPrivilegeDTO[];
  constructor(
    public user: UserDataService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.privileges = user.getPrivileges() ?? [];
  }

  get username(): string {
    return (this.user.getUserData()?.userName as string) || '';
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

  hasPrivilege(p: string): FieldPrivilegeDTO {
    return (
      this.privileges.find((x) => x.name == p) ?? ({} as FieldPrivilegeDTO)
    );
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
