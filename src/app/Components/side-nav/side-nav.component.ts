import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
}
