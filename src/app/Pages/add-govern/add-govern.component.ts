import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-govern',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './add-govern.component.html',
  styleUrl: './add-govern.component.css',
})
export class AddGovernComponent {
  GovernFrom: FormGroup;
  governs = [];

  constructor(private fb: FormBuilder) {
    this.GovernFrom = this.fb.group({
      name: ['', Validators.required],
      Cities: this.fb.array([]),
    });
  }

  get Cities() {
    return this.GovernFrom.get('Cities') as FormArray;
  }

  addCity() {
    let newCity = this.fb.group({
      name: ['', Validators.required],
      normalCharge: ['', Validators.required],
      pickupCharge: ['', Validators.required],
      specialChargeForSeller: ['', Validators.required],
    });

    this.Cities.push(newCity);
  }

  onSubmit() {
    console.log(this.GovernFrom.value);
  }
}
