import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addGovern } from '../../Models/Govern.interface';
import { ToastrService } from 'ngx-toastr';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';

@Component({
  selector: 'app-add-govern',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './add-govern.component.html',
  styleUrl: './add-govern.component.css',
})
export class AddGovernComponent implements OnInit {
  GovernFrom: FormGroup;
  governs = [];
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private _unitOfWork: UnitOfWorkService,
    private _activeRoute: ActivatedRoute,
    private _toaster: ToastrService
  ) {
    this.GovernFrom = this.fb.group({
      name: ['', Validators.required],
      cities: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this._unitOfWork.Govern.getById(params['id']).subscribe(
          (data: addGovern) => {
            console.log(data);

            this.GovernFrom.patchValue(data);
            for (let city of data.cities) {
              this.Cities.push(this.fb.group(city));
            }
          }
        );
      }
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
      console.log(this.GovernFrom.value);
      if (this.id == 0) {
        this._unitOfWork.Govern.create(
          this.GovernFrom.value as addGovern
        ).subscribe({
          next: (data) => {
            console.log(data);
            this._toaster.success('Govern Added Successfully', 'Success');
          },
          error: (error) => {
            console.error(error);
            this._toaster.error('Govern Not Added', 'Error');
          },
        });
      } else {
        this._unitOfWork.Govern.update(
          this.id,
          this.GovernFrom.value as addGovern
        ).subscribe({
          next: (data) => {
            console.log(data);
            this._toaster.success('Govern Edited Successfully', 'Success');
          },
          error: (error) => {
            console.error(error);
            this._toaster.error('Govern Not Edited', 'Error');
          },
        });
      }
    }
  }
}
