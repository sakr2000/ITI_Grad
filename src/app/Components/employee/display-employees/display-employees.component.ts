import { UnitOfWorkService } from './../../../Services/unitOfWork.service';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetEmployee } from '../../../Models/Employee/getEmployee.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-employees',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.css',
})
export class DisplayEmployeesComponent {
  employees: GetEmployee[] = [];

  constructor(private _unitOfWork: UnitOfWorkService) {}

  ngOnInit() {
    this._unitOfWork.Employee.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
