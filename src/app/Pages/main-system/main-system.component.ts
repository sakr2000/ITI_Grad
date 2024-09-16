import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserOptionsService } from '../../Services/user-options.service';

@Component({
  selector: 'app-main-system',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './main-system.component.html',
  styleUrl: './main-system.component.css',
})
export class MainSystemComponent {
  toggled: boolean;

  constructor(private _options: UserOptionsService) {
    this.toggled = _options.userOptions.sideNavHide;
  }
  toggleSidebar() {
    this.toggled = !this.toggled;
    this._options.changeProps('sideNavHide', this.toggled);
  }
}
