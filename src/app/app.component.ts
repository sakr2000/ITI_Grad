import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // لاستيراد DatePipe وأشياء أخرى شائعة
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // إضافة ReactiveFormsModule هنا
import { CreateBranchComponent } from './components/create-branch/create-branch.component';
import { TraderComponent } from './components/trader/trader.component';
import { HttpClientModule } from '@angular/common/http';
import { BranchesComponent } from "./components/branches/branches.component";
import { AddOrderComponent } from "./components/add-order/add-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, // استيراد CommonModule
    FormsModule,
    ReactiveFormsModule, // تأكد من إضافة ReactiveFormsModule هنا
    HttpClientModule,
    CreateBranchComponent,
    TraderComponent,
    BranchesComponent,
    AddOrderComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ITI_Grad';
}
