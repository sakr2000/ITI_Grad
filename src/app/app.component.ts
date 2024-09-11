import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraderComponent } from "./components/trader/trader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TraderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ITI_Grad';
}
