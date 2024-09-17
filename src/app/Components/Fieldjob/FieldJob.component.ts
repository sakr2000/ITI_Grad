import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldJobService } from '../../Services/FieldJob.service';
import { Router } from '@angular/router';
import { FieldPrivilegeDTO, FieldJob } from '../../Models/Privilege';
import { HttpClient } from '@angular/common/http';
import { AddFieldJobComponent } from '../add-field-job/add-field-job.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

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
  constructor(
    private fieldJobService: FieldJobService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.fetchPrivileges();
    this.loadFieldJob();
  }
  fetchPrivileges() {
    this.http
      .get('http://localhost:5298/api/Privilege')
      .subscribe((response: any) => {
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
    this.fieldJobService.deleteJob(id).subscribe(
      () => {
        console.log('Deleted FieldJob with ID:', id);
        this.loadFieldJob();
      },
      (error) => {
        console.error('Error deleting FieldJob:', error);
      }
    );
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
}
