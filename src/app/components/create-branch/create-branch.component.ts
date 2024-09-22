import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../Services/branch.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-create-branch',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css'],
})
export class CreateBranchComponent {
  branchName: string = '';
  branches: string[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private branchService: BranchService) {}

  onSubmit() {
    if (this.branchName) {
      this.branchService.create(this.branchName).subscribe({
        next: (response: any) => {
          console.log('Branch added successfully:', response);
          this.branches.push(this.branchName);
          this.branchName = '';
          this.successMessage = 'تمت إضافة الفرع بنجاح!';
          this.errorMessage = null;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error adding branch:', err);
          this.errorMessage = 'حدث خطأ أثناء إضافة الفرع. حاول مرة أخرى!';
          this.successMessage = null;
        },
      });
    }
  }
}
