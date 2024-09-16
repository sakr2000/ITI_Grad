import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trader',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})
export class TraderComponent implements OnInit {
  traderForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.traderForm = this.fb.group({
      traderName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      shopName: ['', Validators.required],
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      pickupCost: ['', Validators.required],
      commissionPercentage: ['', Validators.required],
      pricingPackages: this.fb.array([])
    });
  }

  get pricingPackages(): FormArray {
    return this.traderForm.get('pricingPackages') as FormArray;
  }

  addPricingPackage() {
    const pricingGroup = this.fb.group({
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      shippingCost: ['', Validators.required]
    });
    this.pricingPackages.push(pricingGroup);
  }

  removePricingPackage(index: number) {
    this.pricingPackages.removeAt(index);
  }

  onSubmit() {
    console.log(this.traderForm.value);
  }
}
