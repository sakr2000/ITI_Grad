import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import {
  GetOrderForReport,
  OrderStatus,
} from '../../../Models/Order.interface';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit {
  status: OrderStatus[] = [];
  reportData: GetOrderForReport[] = [];
  page: number = 1;
  constructor(
    private http: HttpClient,
    private _unitOfWork: UnitOfWorkService,
    private toastr: ToastrService
  ) {}
  api = 'http://localhost:5298/api/Order/Report';
  reprotForm = new FormGroup({
    orderStatus: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this._unitOfWork.OrderStatus.getAll().subscribe({
      next: (data) => {
        this.status = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.reprotForm.valid) {
      console.log(this.reprotForm.value);

      this.http
        .get(
          `${this.api}/${this.reprotForm.value.startDate}/${this.reprotForm.value.endDate}/${this.reprotForm.value.orderStatus}`
        )
        .subscribe({
          next: (data: any) => {
            this.reportData = data;
          },

          error: (err) => {
            this.reportData = [];
            console.log(err);
            if (err.status == 404) {
              this.toastr.warning('لا يوجد بيانات', 'خطأ');
            }
          },
        });
    } else {
      this.reprotForm.markAllAsTouched();
    }
  }
}
