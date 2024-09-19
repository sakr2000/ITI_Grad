import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { AddEmployee } from '../../../Models/addEmployee.interface';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { GetGovern } from '../../../Models/Govern/getGovern.interface';
import { GetBranch } from '../../../Models/Branch/getBranch.interface';
import { FieldJob } from '../../../Models/FieldJob';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}
  governs: GetGovern[] = [];
  branches: GetBranch[] = [];
  feildJobs: FieldJob[] = [];
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      branchID: ['', Validators.required],
      fieldJobID: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', Validators.required],
      govern: ['', Validators.required],
      city: ['', Validators.required],
    });
    forkJoin([
      this._unitOfWork.Govern.getAll(),
      this._unitOfWork.Branch.getAll(),
      this._unitOfWork.FieldJob.getAllJobs(),
    ]).subscribe({
      next: ([governs, branches, fieldJobs]) => {
        console.log(governs, branches, fieldJobs);
        this.governs = governs;
        this.branches = branches;
        this.feildJobs = fieldJobs;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCities(e: Event, select: HTMLSelectElement) {
    let selectedGovern = e.target as HTMLSelectElement;
    if (selectedGovern.value) {
      select.innerHTML =
        ' <option value="" disabled selected>اختر المدينة</option>';
      this.governs[selectedGovern.selectedIndex - 1].cities.forEach((city) => {
        select.appendChild(new Option(city.name, city.id.toString()));
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this._unitOfWork.Employee.create(
        this.employeeForm.value as AddEmployee
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.toaster.success('Employee Added Successfully', 'Success');
        },
        error: (err) => {
          console.log(err);
          this.toaster.error('Error Adding Employee', 'Error');
        },
      });
    }
  }
}
