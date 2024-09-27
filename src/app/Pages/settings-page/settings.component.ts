import { Component } from '@angular/core';
import { WeightComponent } from '../../Components/weight/weight.component';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import { TypeOFChargeComponent } from '../../Components/type-ofcharge/type-ofcharge.component';
import { TypeOfPaymentComponent } from '../../Components/type-of-payment/type-of-payment.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    WeightComponent,
    PageHeaderComponent,
    TypeOFChargeComponent,
    TypeOfPaymentComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
