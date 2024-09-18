import { Component } from '@angular/core';
import { WeightComponent } from '../../Components/weight/weight.component';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [WeightComponent, PageHeaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
