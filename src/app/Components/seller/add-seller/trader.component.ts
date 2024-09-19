import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { AddSeller } from '../../../Models/addSeller.interface';

@Component({
  selector: 'app-trader',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PageHeaderComponent],
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css'],
})
export class TraderComponent implements OnInit {
  traderForm!: FormGroup;
  governs: any = [];
  constructor(
    private fb: FormBuilder,
    private _unitOfWork: UnitOfWorkService
  ) {}

  ngOnInit(): void {
    this.traderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branchID: ['', Validators.required],
      password: ['', Validators.required],
      govern: ['', Validators.required],
      city: ['', Validators.required],
      storeName: ['', Validators.required],
      pickUp: ['', Validators.required],
      address: ['', Validators.required],
      valueOfRejectedOrder: ['', Validators.required],
      citySellers: this.fb.array([]),
    });

    this._unitOfWork.Govern.getAll().subscribe({
      next: (data) => {
        this.governs = data;
        console.log(this.governs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get pricingPackages(): FormArray {
    return this.traderForm.get('citySellers') as FormArray;
  }

  addPricingPackage() {
    const pricingGroup = this.fb.group({
      cityId: ['', Validators.required],
      specialCharge: ['', Validators.required],
    });
    this.pricingPackages.push(pricingGroup);
  }

  removePricingPackage(index: number) {
    this.pricingPackages.removeAt(index);
  }

  onSubmit() {
    let x = this.traderForm.value as AddSeller;
    console.log(x);
    // if (this.traderForm.valid) {
    //   this._unitOfWork.Selller.create(
    //     this.traderForm.value as AddSeller
    //   ).subscribe({
    //     next: (data) => {
    //       console.log(data);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // }
  }

  onGovernChange(index: number, event: Event) {}
}
