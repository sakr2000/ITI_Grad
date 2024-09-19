import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { WeightCharge } from '../../Models/weightCharge.interface';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';

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

  WeightForm = new FormGroup({
    defaultWeight: new FormControl(this.weightCharge.defaultWeight),
    additionalWeight: new FormControl(this.weightCharge.additionalWeight),
  });
  constructor(private _unitOfWork: UnitOfWorkService) {}

  ngOnInit(): void {
    this._unitOfWork.Weight.getWeight().subscribe({
      next: (data: any) => {
        this.weightCharge = (data[0] as WeightCharge) ?? {};
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveWeight() {
    this.weightCharge = this.WeightForm.value as WeightCharge;
    this._unitOfWork.Weight.setWeight(this.weightCharge).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.editWeight = false;
  }
}
