import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  isLoading;
  constructor(private loadingService: LoadingService) {
    this.isLoading = loadingService.loading;
  }
}
