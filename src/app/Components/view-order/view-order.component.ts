import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [NgxPaginationModule,FormsModule, CommonModule,],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
  orders: any[] =[
    {
      serialNumber: 40330529,
      date: new Date('2021-09-21T00:25:00'),
      clientName: 'Ahmed',
      clientPhone: '01111464656',
      governorate: 'محافظة الوادي الجديد',
      city: 'الطارف',
      cost: 500
    },
    {
      serialNumber: 82694133,
      date: new Date('2021-05-19T11:18:00'),
      clientName: 'سالى',
      clientPhone: '01122255588',
      governorate: 'القاهرة',
      city: 'مدينتي',
      cost: 100
    },
    {
      serialNumber: 69037711,
      date: new Date('2021-05-19T11:18:00'),
      clientName: 'سالى',
      clientPhone: '01122255588',
      governorate: 'القاهرة',
      city: 'مدينتي',
      cost: 100
    },
    {
      serialNumber: 78382639,
      date: new Date('2021-05-19T11:18:00'),
      clientName: 'سالى',
      clientPhone: '01122255588',
      governorate: 'القاهرة',
      city: 'مدينتي',
      cost: 100
    }
  ];
  page: number = 1;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
    this.http.get<any[]>('api').subscribe(data => {
      this.orders = data;
    });
  }
  deleteOrder(orderId: number): void {
    
  }
  printOrder(orderId: number): void {
    
  }

}
