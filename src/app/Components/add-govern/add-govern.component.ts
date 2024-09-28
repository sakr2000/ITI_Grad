import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addGovern } from '../../Models/Govern.interface';
import { ToastrService } from 'ngx-toastr';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-govern',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './add-govern.component.html',
  styleUrl: './add-govern.component.css',
})
export class AddGovernComponent {
  GovernFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _unitOfWork: UnitOfWorkService,
    private _toaster: ToastrService,
    private router: Router
  ) {
    this.GovernFrom = this.fb.group({
      name: ['', Validators.required],
      cities: this.fb.array([]),
    });
  }

  get Cities() {
    return this.GovernFrom.get('cities') as FormArray;
  }

  addCity() {
    let newCity = this.fb.group({
      name: ['', Validators.required],
      normalCharge: ['', Validators.required],
      pickUpCharge: ['', Validators.required],
      specialChargeForSeller: [null],
    });

    this.Cities.push(newCity);
  }

  onSubmit() {
    if (this.GovernFrom.valid) {
      this._unitOfWork.Govern.create(
        this.GovernFrom.value as addGovern
      ).subscribe({
        next: (data) => {
          console.log(data);
          this._toaster.success('تمت الاضافة بنجاح').onHidden.subscribe(() => {
            this.router.navigate(['/Govern']);
          });
        },
        error: (error) => {
          console.error(error);
          this._toaster.error('حدث خطأ في عملية الاضافة', 'خطأ');
        },
      });
    }
  }
}
