import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldPrivilegeDTO, FieldJob } from '../../Models/FieldJob';
import { PrivilegesService } from '../../Services/privileges-service.service';
import { ToastrService } from 'ngx-toastr';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';

@Component({
  selector: 'app-add-field-job',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-field-job.component.html',
  styleUrl: './add-field-job.component.css',
})
export class AddFieldJobComponent implements OnChanges {
  @Input() privileges!: FieldPrivilegeDTO[];
  @Input() editMode: boolean = false;
  @Input() viewMode: boolean = false;
  @Input() fieldJobToEdit?: FieldJob;
  @Output() fieldJobUpdated = new EventEmitter<void>();
  newFieldJobName = '';
  @ViewChild('modal') modal!: ElementRef;
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private privilegeService: PrivilegesService,
    private toaster: ToastrService
  ) {}

  ngOnChanges() {
    if (!this.privileges) {
      this.privileges = [];
    }
    if (this.fieldJobToEdit) {
      this.newFieldJobName = this.fieldJobToEdit.name;
      this.privileges = this.fieldJobToEdit.fieldPrivilegeDTO.map(
        (priv: any) => ({
          privilegeID: priv.privilegeID,
          name: priv.name,
          add: priv.add,
          delete: priv.delete,
          display: priv.display,
          edit: priv.edit,
        })
      );
    } else if (!this.editMode && !this.viewMode) {
      this.newFieldJobName = '';
      this.resetPrivileges();
    }
  }
  validatePrivileges(): boolean {
    if (this.newFieldJobName === '') {
      this.toaster.error('يجب تحديد اسم الصلاحية', 'خطأ');
      return false;
    }
    for (let privilege of this.privileges) {
      const hasOtherChecks =
        privilege.add || privilege.delete || privilege.edit;
      if (hasOtherChecks && !privilege.display) {
        this.toaster.error(
          `يجب تحديد صلاحية العرض مع  ${privilege.name}`,
          'خطأ'
        );
        return false;
      }
    }

    const allUnchecked = this.privileges.every(
      (privilege) =>
        !privilege.add &&
        !privilege.delete &&
        !privilege.display &&
        !privilege.edit
    );

    if (allUnchecked) {
      this.toaster.error('يجب تحديد صلاحيات واحدة على الاقل', 'خطأ');
      return false;
    }
    return true;
  }

  resetPrivileges() {
    if (!this.privileges) {
      this.privileges = [];
    }
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
  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  openModal() {
    if (!this.editMode && !this.viewMode) {
      this.newFieldJobName = '';
      this.privileges = this.privileges.map((priv) => ({
        privilegeID: priv.privilegeID,
        name: priv.name,
        add: false,
        delete: false,
        display: false,
        edit: false,
      }));
    }
    this.modal.nativeElement.style.display = 'block';
  }

  saveFieldJob() {
    if (!this.validatePrivileges()) {
      return;
    }
    const selectedPrivileges = this.privileges.map((priv) => ({
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
        fieldPrivilegeCollection: selectedPrivileges,
      };

      this._unitOfWork.FieldJob.updateJob(updatedFieldJob).subscribe(
        () => {
          this.toaster.success('تم التعديل بنجاح', 'تم');
          this.closeModal();
          this.fieldJobUpdated.emit();
        },
        (error) => {
          this.toaster.error('حدث خطأ عند التعديل', 'خطأ');
        }
      );
    } else {
      const newFieldJob = {
        Name: this.newFieldJobName,
        FieldPrivilegeDTo: selectedPrivileges,
      };

      this._unitOfWork.FieldJob.addJob(newFieldJob).subscribe(
        () => {
          this.toaster.success('تم الاضافة بنجاح', 'تم');
          this.closeModal();
          this.fieldJobUpdated.emit();
        },
        (error) => {
          this.toaster.error('حدث خطأ عند الاضافة', 'خطأ');
        }
      );
    }
  }
}
