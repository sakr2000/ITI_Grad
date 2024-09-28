import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { UserDataService } from '../../../Services/userData.service';
import { ToastrService } from 'ngx-toastr';
import { FieldPrivilegeDTO } from '../../../Models/FieldJob';
import { InvoiceService } from '../../../Services/Invoice.service';
import {
  GetOrder,
  OrderStatus,
  statusTranslations,
} from '../../../Models/Order.interface';
import { ChangeOrderStatusComponent } from '../../change-order-status/change-order-status.component';


@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    PageHeaderComponent,
    RouterLink,
    ChangeOrderStatusComponent,
  ],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent {
  orders: any[] = [];
  Statuses: OrderStatus[] = [];
  filteredOrders: any[] = [];
  page: number = 1;
  activeStatus: number | null = null;
  selectedStatusId: number | null = null;
  privileges!: FieldPrivilegeDTO;
  @ViewChild(ChangeOrderStatusComponent)
  changeStatusModal!: ChangeOrderStatusComponent;
  searchTerm: string = '';
  constructor(
    private _unitOfWork: UnitOfWorkService,
    public User: UserDataService,
    private toastr: ToastrService,
    private Invoice:InvoiceService
  ) {}

  ngOnInit(): void {
    this.loadStatuses();
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
          status: order.orderStatusID,
          statusName:
            statusTranslations[order.orderStatusName] || order.orderStatusName,
        }));

        this.filteredOrders = this.orders;
      },
    });
  }
  onSearchChange(): void {
    this.filterOrders();
  }
  filterOrders(): void {
    let filtered = this.orders;
    if (this.activeStatus !== null) {
      filtered = filtered.filter(
        (order) => order.orderStatusID === this.activeStatus
      );
    }
    if (this.searchTerm.trim() !== '') {
      filtered = filtered.filter((order) =>
        order.serialNumber.toString().includes(this.searchTerm.trim())
      );
    }

    this.filteredOrders = filtered;
    this.page = 1;
  }
  filterOrdersByStatus(statusId: number | null): void {
    this.activeStatus = statusId;
    if (statusId === null) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.status === statusId
      );
    }
    console.log(this.filteredOrders);

    this.page = 1;
  }
  changeOrderStatus(orderID: number, currentStatus: number): void {
    this.changeStatusModal.form.get('status')?.setValue(currentStatus);
    this.changeStatusModal.form.get('orderId')?.setValue(orderID);
    this.changeStatusModal.openModal();
  }
  deleteOrder(orderId: number): void {
    this._unitOfWork.Order.delete(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        this.filteredOrders = this.filteredOrders.filter(
          (order) => order.id !== orderId
        );
        this.toastr.success('تم حذف الطلب بنجاح', 'تم الحذف');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error deleting order:', error);
        this.toastr.error('حدث خطأ أثناء الحذف', 'خطأ');
      },
    });
  }
  printOrder(orderId: number): void {
    this.Invoice.getById(orderId).subscribe({
      next: (pdfBlob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const newWindow = window.open(url, '_blank');
        if (newWindow) {
          newWindow.focus();
        } else {
          this.toastr.error('لا يمكن تحميل الفتورة', 'خطا');
        }
      },
      error: (err) => {
        console.error('Error fetching order PDF:', err);
        this.toastr.error('PDF حدث خطا اثناء تحويل الملف ل ', 'خطا');
      }
    });
  }

  loadStatuses() {
    this._unitOfWork.OrderStatus.getAll().subscribe({
      next: (response: OrderStatus[]) => {
        this.Statuses = response.map((status) => ({
          ...status,
          name: statusTranslations[status.name] || status.name,
        }));

        if (this.User.isEmployee()) {
          this.Statuses = this.Statuses.filter((status) =>
            [
              'جديد',
              'قيد الانتظار',
              'تسليم لمندوب',
              'مرفوض',
              'غير قابل للتسليم',
            ].includes(status.name)
          );
        } else if (this.User.isAgent()) {
          this.Statuses = this.Statuses.filter(
            (status) =>
              ![
                'جديد',
                'قيد الانتظار',
                'تسليم لمندوب',
                'مرفوض',
                'غير قابل للتسليم',
              ].includes(status.name)
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
