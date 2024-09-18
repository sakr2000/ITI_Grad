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
  weightCharge: WeightCharge = {
    weight: 0,
    charge: 0,
    extra: 0,
  };

  WeightForm = new FormGroup({
    weight: new FormControl(this.weightCharge.weight),
    charge: new FormControl(this.weightCharge.charge),
    extra: new FormControl(this.weightCharge.extra),
  });
  constructor(private _unitOfWork: UnitOfWorkService) {}

  ngOnInit(): void {
    //TODO : get weight from database
  }

  saveWeight() {
    this.weightCharge = this.WeightForm.value as WeightCharge;
    //TODO : save weight to database
    this.editWeight = false;
  }
}
