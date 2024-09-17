import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { SellerService } from '../../Services/seller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-sellers',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink],
  templateUrl: './display-sellers.component.html',
  styleUrl: './display-sellers.component.css',
})
export class DisplaySellersComponent implements OnInit {
  data: any = [];

  constructor(
    private _sellerService: SellerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this._sellerService.getAll().subscribe({
      next: (data) => {
        this.data = data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: number) {
    this.toaster.error('everything is broken', 'Major Error', {
      timeOut: 3000,
    });
  }
}
