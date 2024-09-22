import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { AddEmployee } from '../../../Models/Employee/addEmployee.interface';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { GetGovern } from '../../../Models/Govern/getGovern.interface';
import { GetBranch } from '../../../Models/Branch/getBranch.interface';
import { ToastrService } from 'ngx-toastr';
import { FieldJob } from '../../../Models/FieldJob';

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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('01(0|1|2|5)[0-9]{8}'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      branchID: ['', Validators.required],
      fieldJobID: ['', Validators.required],
      status: [true],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_/$%^&*])[a-zA-Z0-9!@#$_/%^&*]{6,16}$/
          ),
        ],
      ],
      govern: ['', Validators.required],
      city: ['', Validators.required],
    });
    forkJoin([
      this._unitOfWork.Branch.getAll(),
      this._unitOfWork.FieldJob.getAllJobs(),
    ]).subscribe({
      next: ([branches, fieldJobs]) => {
        this.branches = branches;
        this.feildJobs = fieldJobs;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
