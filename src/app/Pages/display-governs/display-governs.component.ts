import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GovernService } from '../../Services/govern.service';
interface govern {
  id: number;
  name: string;
  status: boolean;
}

@Component({
  selector: 'app-display-governs',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './display-governs.component.html',
  styleUrl: './display-governs.component.css',
})
export class DisplayGovernsComponent implements OnInit {
  governs: govern[] = [];
  constructor(private _governService: GovernService) {}
  ngOnInit(): void {
    this._governService.getAll().subscribe((data) => {
      console.log(data);

      this.governs = data;
    });
  }
  toggleStatus(i: number) {
    this.governs[i].status = !this.governs[i].status;
  }
}
