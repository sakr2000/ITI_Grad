import { Component, OnInit } from '@angular/core';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeOfCharge } from '../../Models/TypeOfCharge';
@Component({
  selector: 'app-type-ofcharge',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './type-ofcharge.component.html',
  styleUrl: './type-ofcharge.component.css',
})
export class TypeOFChargeComponent implements OnInit {
  typesOfCharges: TypeOfCharge[] = [];
  addType = false;
  addTypeOfChargeForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    cost: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this._unitOfWork.TypeOfCharge.getAll().subscribe({
      next: (data) => {
        this.typesOfCharges = data;
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }

  addTypeOfCharge() {
    if (this.addTypeOfChargeForm.valid) {
      if (this.addTypeOfChargeForm.get('id')?.value == 0) {
        this._unitOfWork.TypeOfCharge.create(
          this.addTypeOfChargeForm.value
        ).subscribe({
          next: (data) => {
            console.log(data);
            this.toaster.success('تم الحفظ بنجاح');
            this.addTypeOfChargeForm.reset();
            this.ngOnInit();
            this.addType = false;
          },
          error: (err) => {
            console.log(err);
            this.toaster.error(err.error.message, 'خطأ');
          },
        });
      } else {
        this._unitOfWork.TypeOfCharge.update(
          this.addTypeOfChargeForm.get('id')?.value,
          this.addTypeOfChargeForm.value
        ).subscribe({
          next: (data) => {
            console.log(data);
            this.toaster.success('تم التعديل بنجاح');
            this.addTypeOfChargeForm.reset();
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
    this._unitOfWork.TypeOfCharge.getById(id).subscribe({
      next: (data) => {
        this.addTypeOfChargeForm.patchValue(data);
        this.addType = true;
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }

  deleteType(id: number) {
    this._unitOfWork.TypeOfCharge.delete(id).subscribe({
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
