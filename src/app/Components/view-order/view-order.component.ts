import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { Router, RouterLink } from '@angular/router';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    PageHeaderComponent,
    RouterLink,
  ],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent {
  orders: any[] = [];
  filteredOrders: any[] = []; 
  page: number = 1;
  selectedStatusId: number | null = null; 

  constructor(private http: HttpClient, private unitOfWork: UnitOfWorkService,private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<any[]>('http://localhost:5298/api/Order/GetAll').subscribe((data) => {
      this.orders = data.map(order => ({
        serialNumber: order.id,
        date: new Date(order.date),
        clientName: order.clientName,
        clientPhone: order.clientNumber,
        governorateID: order.governID,
        cityID: order.cityID,
        governorate: order.govern,
        city: order.city,
        cost: order.cost,
        orderStatusID: order.orderStatusID 
      }));

      this.populateGovernAndCityNames();
      this.filteredOrders = this.orders; 
    });
  }

  populateGovernAndCityNames(): void {
    this.orders.forEach(order => {
      this.getGovernorateName(order.governorateID).subscribe((governorateName: string) => {
        order.governorate = governorateName;
      });

      this.getCityName(order.cityID).subscribe((cityName: string) => {
        order.city = cityName;
      });
    });
  }

  getGovernorateName(governID: number) {
    const apiUrl = `http://localhost:5298/api/Govern/${governID}`;
    return this.http.get<{ name: string }>(apiUrl).pipe(map(response => response.name));
  }

  getCityName(cityID: number) {
    const apiUrl = `http://localhost:5298/api/City/${cityID}`;
    return this.http.get<{ name: string }>(apiUrl).pipe(map(response => response.name));
  }

  
  filterOrdersByStatus(statusId: number | null): void {
    debugger
    if (statusId === null) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.orderStatusID === statusId);
    }
    this.page = 1;
  }

  deleteOrder(orderId: number): void {
    const apiUrl = `http://localhost:5298/api/Order/${orderId}`;
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete(apiUrl).subscribe(() => {
        this.orders = this.orders.filter(order => order.serialNumber !== orderId);
        this.filteredOrders = this.filteredOrders.filter(order => order.serialNumber !== orderId);
        alert('Order deleted successfully.');
      }, error => {
        console.error('Error deleting order:', error);
        alert('Failed to delete the order.');
      });
    }
  }

  printOrder(orderId: number): void {
   
  }
}
