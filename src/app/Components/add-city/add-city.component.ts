import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css',
})
export class AddCityComponent {
  id: number = 0;
  @ViewChild('modal') modal!: ElementRef;
  @Output() citiesChanged = new EventEmitter();
  cityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    governID: new FormControl(0, Validators.required),
    normalCharge: new FormControl(0, [Validators.required, Validators.min(1)]),
    pickUpCharge: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toastr: ToastrService
  ) {}

  closeModal() {
    this.cityForm.reset();
    this.modal.nativeElement.style.display = 'none';
  }
  addModal(governId: number) {
    this.cityForm.get('governID')?.setValue(governId);
    this.modal.nativeElement.style.display = 'block';
  }
  editModal(cityId = 0) {
    this.id = cityId;
    this._unitOfWork.City.getById(cityId).subscribe({
      next: (data) => {
        this.cityForm.patchValue(data);
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.modal.nativeElement.style.display = 'block';
  }

  onSubmit() {
    if (this.cityForm.valid) {
      if (this.id == 0) {
        this._unitOfWork.City.create(this.cityForm.value).subscribe({
          next: (response) => {
            this.toastr.success('تم الاضافة بنجاح');
            this.citiesChanged.emit();
            this.closeModal();
          },
          error: (e) => {
            console.log(e);
            this.toastr.error('حدث خطأ عند الاضافة');
          },
        });
      } else {
        this._unitOfWork.City.update(this.id, this.cityForm.value).subscribe({
          next: (response) => {
            this.toastr.success('تم التعديل بنجاح');
            this.citiesChanged.emit();
            this.closeModal();
          },
          error: (e) => {
            console.log(e);
            this.toastr.error('حدث خطأ عند التعديل');
          },
        });
      }
    } else {
      this.cityForm.markAllAsTouched();
    }
  }
}
