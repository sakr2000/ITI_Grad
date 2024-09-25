import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../../Services/userData.service';
interface Branch {
  id: number;
  name: string;
  date: string | Date | null;
  status: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, RouterLink],
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  editingBranchId: number | null = null;

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toastr: ToastrService,
    public user: UserDataService
  ) {}

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
    this._unitOfWork.Branch.getAll().subscribe({
      next: (data: Branch[]) => {
        if (this.user.isAdmin()) {
          this.branches = data;
          this.filteredBranches = this.branches;
        } else {
          this.branches = data.filter((b) => b.status);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredBranches = this.branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchTerm)
    );
  }

  toggleStatus(branch: Branch): void {
    this._unitOfWork.Branch.update(branch.id, branch).subscribe({
      next: (data) => {
        this.toastr.success('تم تغيير الحالة بنجاح', 'تم');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('حدث خطأ أثناء تغيير الحالة', 'خطأ');
      },
    });
  }

  editBranch(branchId: number): void {
    this.editingBranchId = branchId;
  }

  // حفظ التعديلات
  saveBranch(branch: Branch): void {
    this._unitOfWork.Branch.update(branch.id, branch).subscribe({
      next: (data) => {
        this.editingBranchId = null;
        this.getBranches();
        this.toastr.success('تم التعديل بنجاح', 'تم');
      },
      error: (err) => {
        console.error('Error updating branch:', err);
        this.toastr.error('حدث خطأ أثناء التعديل', 'خطأ');
      },
    });
  }

  // إلغاء التحرير
  cancelEdit(): void {
    this.editingBranchId = null;
  }

  deleteBranch(branchId: number): void {
    this._unitOfWork.Branch.delete(branchId).subscribe({
      next: (data) => {
        this.branches = this.branches.filter(
          (branch) => branch.id !== branchId
        );
        this.filteredBranches = this.filteredBranches.filter(
          (branch) => branch.id !== branchId
        );
        this.toastr.success('تم الحذف بنجاح', 'تم');
      },
      error: (err) => {
        if (err.status == 500) {
          this.toastr.error('لا يمكن حذف الفرع', 'خطأ');
        } else {
          console.error('Error deleting branch:', err);
          this.toastr.error('حدث خطأ أثناء الحذف', 'خطأ');
        }
      },
    });
  }
}
