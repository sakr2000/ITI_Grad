import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BranchService } from '../../Services/branch.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class AddOrderComponent implements OnInit {
  addOrderForm!: FormGroup;
  branches: any[] = [];

  constructor(private fb: FormBuilder, private branchService: BranchService) {}

  ngOnInit(): void {
    this.addOrderForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone1: ['', Validators.required],
      phone2: [''],
      city: ['', Validators.required],
      province: ['', Validators.required],
      shippingType: ['', Validators.required],
      paymentType: ['', Validators.required],
      address: ['', Validators.required],
      branch: ['', Validators.required],
      products: this.fb.array([]),
    });

    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get products(): FormArray {
    return this.addOrderForm.get('products') as FormArray;
  }

  addProduct() {
    const productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, Validators.required],
      weight: [1, Validators.required],
    });
    this.products.push(productForm);
  }
  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onSubmit() {
    if (this.addOrderForm.valid) {
      const orderData = {
        ...this.addOrderForm.value,
        products: this.products.value,
      };
      console.log(orderData);
    } else {
      console.log('Form is invalid!');
    }
  }
}
