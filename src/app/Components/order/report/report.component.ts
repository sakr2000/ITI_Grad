import { statusTranslations } from './../../../Models/Order.interface';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
        this.status = data.map((status: OrderStatus) => {
          return {
            id: status.id,
            name: statusTranslations[status.name] || status.name,
          };
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  printPDF(): void {
    const DATA = document.getElementById('reportTable');

    html2canvas(DATA!).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const marginLeft = 5;
      const marginTop = 5;

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        marginLeft,
        marginTop,
        imgWidth - 2 * marginLeft,
        imgHeight
      );

      pdf.save('OrderReport.pdf');
    });
  }
  onSubmit() {
    if (this.reprotForm.valid) {
      this.http
        .get(
          `${this.api}/${this.reprotForm.value.startDate}/${this.reprotForm.value.endDate}/${this.reprotForm.value.orderStatus}`
        )
        .subscribe({
          next: (data: any) => {
            console.log(data);

            this.reportData = data.map((item: any) => {
              return {
                ...item,

                orderStatusName:
                  statusTranslations[item.orderStatusName] ||
                  item.orderStatusName,
              };
            });
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
