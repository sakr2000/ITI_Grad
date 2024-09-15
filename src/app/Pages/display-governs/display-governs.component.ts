import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface govern {
  id: number;
  name: string;
  status: boolean;
}

@Component({
  selector: 'app-display-governs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-governs.component.html',
  styleUrl: './display-governs.component.css',
})
export class DisplayGovernsComponent {
  governs: govern[] = [
    { id: 1, name: 'المدينة المنورة', status: true },
    { id: 2, name: 'المدينة المنورة', status: false },
    { id: 3, name: 'المدينة المنورة', status: true },
  ];

  toggleStatus(i: number) {
    this.governs[i].status = !this.governs[i].status;
  }
}
