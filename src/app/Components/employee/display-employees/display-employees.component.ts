import { GetUser } from './../../../Models/user.model';
import { UnitOfWorkService } from './../../../Services/unitOfWork.service';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetEmployee } from '../../../Models/Employee/getEmployee.interface';
import { UserDataService } from '../../../Services/userData.service';
import { FieldPrivilegeDTO } from '../../../Models/FieldJob';

@Component({
  selector: 'app-display-employees',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.css',
})
export class DisplayEmployeesComponent {
  employees: GetEmployee[] = [];
  Privileges!: FieldPrivilegeDTO;
  tempo!: boolean;
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService,
    public User: UserDataService
  ) {}

  ngOnInit() {
    this._unitOfWork.Employee.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
    this.tempo = this.User.isAdmin();
    this.Privileges =
      this.User.getPrivileges()?.find((x) => x.name == 'الموظفين') ??
      ({} as FieldPrivilegeDTO);
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
