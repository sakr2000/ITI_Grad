import { Component } from '@angular/core';
import { WeightComponent } from '../../Components/weight/weight.component';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import { TypeOFChargeComponent } from '../../Components/type-ofcharge/type-ofcharge.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [WeightComponent, PageHeaderComponent, TypeOFChargeComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
