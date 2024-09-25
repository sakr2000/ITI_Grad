import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WeightCharge } from '../../models/weightCharge.interface';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.css',
})
export class WeightComponent implements OnInit {
  editWeight = false;
  weightCharge!: WeightCharge;

  WeightForm!: FormGroup;
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this._unitOfWork.Weight.getWeight().subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.length == 0) {
          this.weightCharge = {
            id: 0,
            defaultWeight: 0,
            additionalWeight: 0,
          };
        } else {
          this.weightCharge = data[0] as WeightCharge;
        }
        this.WeightForm = new FormGroup({
          defaultWeight: new FormControl(this.weightCharge.defaultWeight, [
            Validators.required,
            Validators.min(1),
          ]),
          additionalWeight: new FormControl(
            this.weightCharge.additionalWeight,
            [Validators.required, Validators.min(1)]
          ),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveWeight() {
    this.weightCharge.defaultWeight = this.WeightForm.get('defaultWeight')
      ?.value as number;
    this.weightCharge.additionalWeight = this.WeightForm.get('additionalWeight')
      ?.value as number;
    if (this.weightCharge.id == 0) {
      this._unitOfWork.Weight.setWeight(this.weightCharge).subscribe({
        next: (data) => {
          console.log(data);
          this.toaster.success('تم التعديل بنجاح');
        },
        error: (err) => {
          console.log(err.error.message);
          this.toaster.error(err.error.message, 'خطأ');
        },
      });
    } else {
      this._unitOfWork.Weight.updateWeight(this.weightCharge).subscribe({
        next: (data) => {
          console.log(data);
          this.toaster.success('تم التعديل بنجاح');
        },
        error: (err) => {
          console.log(err.error.message);
          this.toaster.error(err.error.message);
        },
      });
    }
    this.editWeight = false;
  }
}
