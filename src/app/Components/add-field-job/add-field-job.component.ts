import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, EventEmitter ,Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldPrivilegeDTO, FieldJob } from '../../models/Privilege';
import { FieldJobService } from '../../service/FieldJob/FieldJob.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-field-job',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-field-job.component.html',
  styleUrl: './add-field-job.component.css'
})
export class AddFieldJobComponent implements OnChanges {
  @Input() privileges!: FieldPrivilegeDTO[];
  @Input() editMode: boolean = false;
  @Input() viewMode: boolean = false;
  @Input() fieldJobToEdit?: FieldJob;
  @Output() fieldJobUpdated = new EventEmitter<void>();

  newFieldJobName = '';
  @ViewChild('modal') modal!: ElementRef;

  constructor(private fieldJobService: FieldJobService,private http:HttpClient) {}

  ngOnChanges() {
    if (!this.privileges) {
      this.privileges = [];
    }
    if (this.fieldJobToEdit) {
      this.newFieldJobName = this.fieldJobToEdit.name;
      this.privileges = this.fieldJobToEdit.fieldPrivilegeDTO.map(priv => ({
        privilegeID: priv.privilegeID,
        name: priv.name,
        add: priv.add,
        delete: priv.delete,
        display: priv.display,
        edit: priv.edit
      }));
    } else if (!this.editMode && !this.viewMode) {
      this.newFieldJobName = '';
      this.resetPrivileges();
    }
  }
  resetPrivileges() {
    if (!this.privileges) {
      this.privileges = [];
    }
    this.http.get('http://localhost:5298/api/Privilege').subscribe((response: any) => {
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
  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  openModal() {
    debugger
    if (!this.editMode && !this.viewMode) {
      this.newFieldJobName = '';
      this.privileges = this.privileges.map(priv => ({
        privilegeID: priv.privilegeID,
        name: priv.name,
        add: false,
        delete: false,
        display: false,
        edit: false
      }));
    }
    this.modal.nativeElement.style.display = 'block';
  }

  saveFieldJob() {
    const selectedPrivileges = this.privileges.map(priv => ({
      PrivilegeID: priv.privilegeID,
      add: priv.add,
      delete: priv.delete,
      display: priv.display,
      edit: priv.edit,
    }));

    if (this.editMode && this.fieldJobToEdit) {
      
      const updatedFieldJob = {
        id: this.fieldJobToEdit.id,
        name: this.newFieldJobName,
        fieldPrivilegeCollection: selectedPrivileges
      };

      this.fieldJobService.updateJob(updatedFieldJob).subscribe(
        () => {
          alert('FieldJob updated successfully');
          this.closeModal();
          this.fieldJobUpdated.emit();
        },
        (error) => {
          alert('Error updating FieldJob');
        }
      );
    } else {
      const newFieldJob = {
        Name: this.newFieldJobName,
        FieldPrivilegeDTo: selectedPrivileges,
      };

      this.fieldJobService.addJob(newFieldJob).subscribe(
        () => {
          alert('FieldJob created successfully');
          this.closeModal();
          this.fieldJobUpdated.emit();
        },
        (error) => {
          alert('Error creating FieldJob');
        }
      );
    }
  }
}

