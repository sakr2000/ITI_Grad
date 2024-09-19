import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-agents',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule],
  templateUrl: './display-agents.component.html',
  styleUrl: './display-agents.component.css',
})
export class DisplayAgentsComponent {
  Agents: any[] = [];

  constructor() {}
}
