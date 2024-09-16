import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldPrivilegeDTO, FieldJob } from '../../Models/Privilege';
import { ActivatedRoute } from '@angular/router';
import { FieldJobService } from '../../Services/FieldJob.service';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.css',
})
export class privilegesComponent {
  fieldJob!: FieldJob;
  privileges: FieldPrivilegeDTO[] | undefined;
  constructor(
    private fieldJobService: FieldJobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fieldJobId = this.route.snapshot.params['id'];
    this.loadFieldJobWithPrivileges(fieldJobId);
  }
  loadFieldJobWithPrivileges(id: number) {
    this.fieldJobService.getJobById(id).subscribe(
      (data) => {
        this.fieldJob = data;
        this.privileges = data.fieldPrivilegeDTO;
      },
      (error) => {
        console.error('Error fetching FieldJob details:', error);
      }
    );
  }
}
