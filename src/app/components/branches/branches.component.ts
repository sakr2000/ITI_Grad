import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Branch {
  id: number;
  name: string;
  date: string | Date | null;
  active: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  editingBranchId: number | null = null; // متغير جديد لتتبع وضع التحرير

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
    this.http.get<Branch[]>('http://localhost:5298/api/Branch').subscribe(data => {
      console.log('Fetched branches:', data);
      this.branches = data;
      this.filteredBranches = this.branches;
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      branch.name.toLowerCase().includes(searchTerm)
    );
  }

  toggleStatus(branchId: number): void {
    const branch = this.branches.find(b => b.id === branchId);
    if (branch) {
      branch.active = !branch.active;
      this.http.put(`http://localhost:5298/api/Branch/${branchId}`, branch).subscribe(response => {
        console.log('Updated branch status:', response);
      });
    }
  }

  // بدء التحرير
  editBranch(branchId: number): void {
    this.editingBranchId = branchId;
  }

  // حفظ التعديلات
  saveBranch(branch: Branch): void {
    this.http.put(`http://localhost:5298/api/Branch/${branch.id}`, branch).subscribe(() => {
      this.editingBranchId = null;
      this.getBranches(); // تحديث القائمة بعد حفظ التعديلات
    });
  }

  // إلغاء التحرير
  cancelEdit(): void {
    this.editingBranchId = null;
  }

  deleteBranch(branchId: number): void {
    this.http.delete(`http://localhost:5298/api/Branch/${branchId}`).subscribe(() => {
      this.branches = this.branches.filter(branch => branch.id !== branchId);
      this.filteredBranches = this.filteredBranches.filter(branch => branch.id !== branchId);
    });
  }
}
