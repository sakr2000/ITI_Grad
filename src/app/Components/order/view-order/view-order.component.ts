import { CommonModule } from '@angular/common';
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
import { GetOrder } from '../../../Models/Order.interface';

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

        this.orders = response.map((order: GetOrder) => ({
          serialNumber: order.id,
          date: new Date(order.date),
          clientName: order.clientName,
          clientPhone: order.clientNumber,
          governorateName: order.governName,
          cityName: order.cityName,
          cost: order.cost,
          orderStatusID: order.orderStatusID,
        }));

        this.filteredOrders = this.orders;
      },
    });
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
        this.orders = this.orders.filter((order) => order.id !== orderId);
        this.filteredOrders = this.filteredOrders.filter(
          (order) => order.id !== orderId
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
