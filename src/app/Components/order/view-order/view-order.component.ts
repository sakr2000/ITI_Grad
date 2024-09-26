import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { map } from 'rxjs';
import { UserDataService } from '../../../Services/userData.service';
import { ToastrService } from 'ngx-toastr';
import { FieldPrivilegeDTO } from '../../../Models/FieldJob';

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
  privileges!: FieldPrivilegeDTO;
  constructor(
    private http: HttpClient,
    private _unitOfWork: UnitOfWorkService,
    public User: UserDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.privileges =
      this.User.getPrivileges()?.find((p) => p.name === 'الطلبات') ??
      ({} as FieldPrivilegeDTO);
  }

  loadOrders(): void {
    this._unitOfWork.Order.getAll().subscribe({
      next: (response) => {
        console.log(response);

        // this.orders = response.map((order) => ({
        //   serialNumber: order.id,
        //   date: new Date(order.date),
        //   clientName: order.clientName,
        //   clientPhone: order.clientNumber,
        //   governorateID: order.governID,
        //   cityID: order.cityID,
        //   governorate: '',
        //   city: '',
        //   cost: order.cost,
        //   orderStatusID: order.orderStatusID,
        // }));

        this.populateGovernAndCityNames();
        this.filteredOrders = this.orders;
      },
    });
  }

  populateGovernAndCityNames(): void {
    this.orders.forEach((order) => {
      this.getGovernorateName(order.governorateID).subscribe(
        (governorateName: string) => {
          order.governorate = governorateName;
        }
      );

      this.getCityName(order.cityID).subscribe((cityName: string) => {
        order.city = cityName;
      });
    });
  }

  getGovernorateName(governID: number) {
    const apiUrl = `http://localhost:5298/api/Govern/${governID}`;
    return this.http
      .get<{ name: string }>(apiUrl)
      .pipe(map((response) => response.name));
  }

  getCityName(cityID: number) {
    const apiUrl = `http://localhost:5298/api/City/${cityID}`;
    return this.http
      .get<{ name: string }>(apiUrl)
      .pipe(map((response) => response.name));
  }

  filterOrdersByStatus(statusId: number | null): void {
    if (statusId === null) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.orderStatusID === statusId
      );
    }
    this.page = 1;
  }

  deleteOrder(orderId: number): void {
    this._unitOfWork.Order.delete(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(
          (order) => order.serialNumber !== orderId
        );
        this.filteredOrders = this.filteredOrders.filter(
          (order) => order.serialNumber !== orderId
        );
        this.toastr.success('تم حذف الطلب بنجاح', 'تم الحذف');
      },
      error: (error) => {
        console.error('Error deleting order:', error);
        this.toastr.error('حدث خطأ أثناء الحذف', 'خطأ');
      },
    });
  }

  printOrder(orderId: number): void {}
}
