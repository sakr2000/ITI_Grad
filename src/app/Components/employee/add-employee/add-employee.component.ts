import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { AddEmployee } from '../../../Models/Employee.interface';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { GetGovern } from '../../../Models/Govern.interface';
import { GetBranch } from '../../../Models/Branch.interface';
import { ToastrService } from 'ngx-toastr';
import { FieldJob } from '../../../Models/FieldJob';
import { privilegeGuard } from '../../../Guards/privilege.guard';
import { Router } from '@angular/router';

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
    private toaster: ToastrService,
    private router: Router
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
          Validators.pattern('[a-zA-Z0-9\u0621-\u064A]*'),
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
          this.toaster
            .success('تم الاضافة بنجاح', 'تم')
            .onHidden.subscribe(() => {
              this.router.navigate(['/Employee']);
            });
        },
        error: (err) => {
          console.log(err);
          this.toaster.error('خطأ أثناء الاضافة', 'خطأ');
        },
      });
    }
  }
}
