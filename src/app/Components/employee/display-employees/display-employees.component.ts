import { UnitOfWorkService } from './../../../Services/unitOfWork.service';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-employees',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule],
  templateUrl: './display-employees.component.html',
  styleUrl: './display-employees.component.css',
})
export class DisplayEmployeesComponent {
  employees: any[] = [];

  constructor(private _unitOfWork: UnitOfWorkService) {}

  ngOnInit() {
    this._unitOfWork.Employee.getAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
