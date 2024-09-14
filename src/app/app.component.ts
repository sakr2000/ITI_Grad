import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // هذا للاستيراد الخاص بـ DatePipe
import { FormsModule } from '@angular/forms';
import { CreateBranchComponent } from './components/create-branch/create-branch.component';
import { TraderComponent } from './components/trader/trader.component';
import { HttpClientModule } from '@angular/common/http';
import { BranchesComponent } from "./components/branches/branches.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, // تأكد من استيراد CommonModule هنا
    FormsModule,
    HttpClientModule,
    CreateBranchComponent,
    TraderComponent,
    BranchesComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ITI_Grad';
}
