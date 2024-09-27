import { Component, OnInit } from '@angular/core';
import { TypeOfPayment } from '../../Models/TypeOfPayment';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-of-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './type-of-payment.component.html',
  styleUrl: './type-of-payment.component.css',
})
export class TypeOfPaymentComponent implements OnInit {
  typesOfPayments: TypeOfPayment[] = [];
  addType = false;
  addTypeOfPaymentForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this._unitOfWork.TypeOfPayment.getAll().subscribe({
      next: (data) => {
        this.typesOfPayments = data;
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }

  addTypeOfCharge() {
    if (this.addTypeOfPaymentForm.valid) {
      if (!this.addTypeOfPaymentForm.get('id')?.value) {
        this._unitOfWork.TypeOfPayment.create(
          this.addTypeOfPaymentForm.value
        ).subscribe({
          next: (data) => {
            console.log(data);
            this.toaster.success('تم الحفظ بنجاح');
            this.addTypeOfPaymentForm.reset();
            this.ngOnInit();
            this.addType = false;
          },
          error: (err) => {
            console.log(err);
            this.toaster.error(err.error.message, 'خطأ');
          },
        });
      } else {
        this._unitOfWork.TypeOfPayment.update(
          this.addTypeOfPaymentForm.get('id')?.value,
          this.addTypeOfPaymentForm.value
        ).subscribe({
          next: (data) => {
            console.log(data);
            this.toaster.success('تم التعديل بنجاح');
            this.addTypeOfPaymentForm.reset();
            this.ngOnInit();
            this.addType = false;
          },
          error: (err) => {
            console.log(err);
            this.toaster.error(err.error.message, 'خطأ');
          },
        });
      }
    }
  }

  editType(id: number) {
    this._unitOfWork.TypeOfPayment.getById(id).subscribe({
      next: (data) => {
        this.addTypeOfPaymentForm.patchValue(data);
        this.addType = true;
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }

  deleteType(id: number) {
    this._unitOfWork.TypeOfPayment.delete(id).subscribe({
      next: (data) => {
        console.log(data);
        this.toaster.success('تم الحذف بنجاح');
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }
}
