import { UnitOfWorkService } from './../../../Services/unitOfWork.service';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetEmployee } from '../../../Models/Employee/getEmployee.interface';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-employees',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.css',
})
export class DisplayEmployeesComponent {
  employees: GetEmployee[] = [];

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this._unitOfWork.Employee.getAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }

  updateList() {
    this._unitOfWork.Employee.getAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteEmployee(id: string) {
    this._unitOfWork.Employee.delete(id).subscribe({
      next: (data) => {
        this.toaster.success('تم الحذف بنجاح');
        this.updateList();
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }
}
