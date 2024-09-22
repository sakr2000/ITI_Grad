import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-agents',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, CommonModule],
  templateUrl: './display-agents.component.html',
  styleUrl: './display-agents.component.css',
})
export class DisplayAgentsComponent implements OnInit {
  Agents: any[] = [];

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this._unitOfWork.Agent.getAll().subscribe({
      next: (data) => {
        this.Agents = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAgent(id: string) {
    this._unitOfWork.Agent.delete(id).subscribe({
      next: (data) => {
        this.toaster.success('تم الحذف بنجاح');
        this.ngOnInit();
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }
}
