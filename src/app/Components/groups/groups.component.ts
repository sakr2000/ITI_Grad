import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldJobService } from '../../Services/group.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent {
  searchQuery = '';
  rowsPerPage = 10;
  rowOptions = [5, 10, 15, 20];
  groups: any[] = [];
  constructor(private fieldJobService: FieldJobService) {}
  ngOnInit(): void {
    this.loadGroups();
  }
  loadGroups() {
    this.fieldJobService.getAllJobs().subscribe(
      (data) => {
        this.groups = data;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  filteredGroups() {
    if (!this.searchQuery) {
      return this.groups;
    }
    return this.groups.filter((group) => group.name.includes(this.searchQuery));
  }

  paginatedGroups() {
    return this.filteredGroups().slice(0, this.rowsPerPage);
  }

  trackById(index: number, group: any) {
    return group.id;
  }

  viewGroup(id: number) {
    console.log('View group with ID:', id);
    this.fieldJobService.getJobById(id).subscribe((group) => {
      console.log('Fetched group:', group);
    });
  }

  editGroup(id: number) {
    console.log('Edit group with ID:', id);
  }

  deleteGroup(id: number) {
    this.fieldJobService.deleteJob(id).subscribe(
      () => {
        console.log('Deleted group with ID:', id);
        this.loadGroups();
      },
      (error) => {
        console.error('Error deleting group:', error);
      }
    );
  }
}
