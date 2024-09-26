import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldJobService } from '../../Services/FieldJob.service';
import { AddFieldJobComponent } from '../add-field-job/add-field-job.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { PrivilegesService } from '../../Services/privileges.service';
import { FieldPrivilegeDTO, FieldJob } from '../../Models/FieldJob';
import { UserDataService } from '../../Services/userData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Fieldjob',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AddFieldJobComponent,
    PageHeaderComponent,
  ],
  templateUrl: './FieldJob.component.html',
  styleUrl: './FieldJob.component.css',
})
export class FieldJobComponent {
  @ViewChild(AddFieldJobComponent) addFieldJobComponent!: AddFieldJobComponent;
  searchQuery = '';
  rowsPerPage = 10;
  rowOptions = [5, 10, 15, 20];
  privileges!: FieldPrivilegeDTO[];
  newFieldJobName = '';
  FieldJob: FieldJob[] = [];
  isEditMode = false;
  viewMode = false;
  fieldJobToEdit?: FieldJob;
  showPrivilegesForm = false;
  privilegeName: string = '';
  constructor(
    private fieldJobService: FieldJobService,
    private privilegeService: PrivilegesService,
    public User: UserDataService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.fetchPrivileges();
    this.loadFieldJob();
  }
  fetchPrivileges() {
    this.privilegeService.getPrivileges().subscribe((response: any) => {
      this.privileges = response.map((privilege: any) => ({
        privilegeID: privilege.id,
        name: privilege.name,
        add: false,
        delete: false,
        display: false,
        edit: false,
      }));
    });
  }

  loadFieldJob() {
    this.fieldJobService.getAllJobs().subscribe(
      (data) => {
        this.FieldJob = data;
      },
      (error) => {
        console.error('Error fetching FieldJobs:', error);
      }
    );
  }

  filteredFieldJob() {
    if (!this.searchQuery) {
      return this.FieldJob;
    }
    return this.FieldJob.filter((FieldJob) =>
      FieldJob.name.includes(this.searchQuery)
    );
  }

  paginatedFieldJob() {
    return this.filteredFieldJob().slice(0, this.rowsPerPage);
  }

  trackById(index: number, FieldJob: any) {
    return FieldJob.id;
  }

  viewFieldJob(fieldJob: FieldJob) {
    this.isEditMode = false;
    this.viewMode = true;
    this.fieldJobToEdit = fieldJob;
    this.addFieldJobComponent.openModal();
  }
  editFieldJob(fieldJob: FieldJob) {
    this.isEditMode = true;
    this.viewMode = false;
    this.fieldJobToEdit = fieldJob;
    this.addFieldJobComponent.openModal();
  }

  deleteFieldJob(id: number) {
    this.fieldJobService.deleteJob(id).subscribe({
      next: () => {
        this.loadFieldJob();
        this.toaster.success('تم حذف الصلاحية بنجاح', 'نجاح');
      },
      error: (error) => {
        this.toaster.error(error.error.message, 'خطأ');
      },
    });
  }
  openAddFieldJobForm() {
    this.isEditMode = false;
    this.viewMode = false;
    this.fieldJobToEdit = undefined;
    this.addFieldJobComponent.openModal();
  }
  handleFieldJobUpdated() {
    this.loadFieldJob();
  }
  togglePrivilegesForm() {
    this.showPrivilegesForm = !this.showPrivilegesForm;
  }

  // Handle form submission
  submitPrivileges() {
    if (this.privilegeName) {
      if (this.privilegeName) {
        const privilege = { name: this.privilegeName };
        this.privilegeService.createPrivilege(privilege).subscribe({
          next: (response) => {
            this.toaster.success('تم اضافة الصلاحية بنجاح');
            this.privilegeName = '';
            this.showPrivilegesForm = false;
            this.loadFieldJob();
            this.fetchPrivileges();
          },
          error: (err) => {
            console.error('Error adding privilege:', err);
          },
        });
      }
    } else {
      this.toaster.error('يجب ادخال اسم الصلاحية', 'خطأ');
    }
  }
}
