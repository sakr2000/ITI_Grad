import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BranchService } from '../../../Services/branch.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order, Product } from '../../../Models/Order';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from '../../page-header/page-header.component';

@Component({
  selector: 'app-add-order',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PageHeaderComponent,
  ],
  standalone: true,
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  addOrderForm!: FormGroup;
  branches: any[] = [];
  cities: any[] = [];
  governments: any[] = [];
  typeOfPayments: any[] = [];
  typeOfCharges: any[] = [];
  typeOfReceipts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.addOrderForm = this.fb.group({
      clientName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      clientNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('01(0|1|2|5)[0-9]{8}'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      clientNumber2: [
        '',
        [
          Validators.pattern('01(0|1|2|5)[0-9]{8}'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      cost: ['', [Validators.required, Validators.min(0)]],
      isForVillage: [false, Validators.required],
      note: [''],
      weight: ['', Validators.min(0)],
      villageOrStreet: ['', Validators.required],
      branchID: ['', Validators.required],
      governID: ['', Validators.required],
      cityID: ['', Validators.required],
      typeOfPaymentID: ['', Validators.required],
      typeOfChargeID: ['', Validators.required],
      typeOfReceiptID: ['', Validators.required],
      orderStatusID: [1],
      sellerID: ['9ef10519-9e30-471b-ad2b-f6f1798cfd15'],
      productList: this.fb.array([]),
    });

    this.loadBranches();
    this.loadGovernments();
    this.loadTypeOfCharges();
    this.loadTypeOfPayments();
    this.loadTypeOfReceipts();
    this.addOrderForm.get('productList')?.valueChanges.subscribe(() => {
      this.calculateTotalWeight();
    });
  }

  get productList(): FormArray {
    return this.addOrderForm.get('productList') as FormArray;
  }
  addProduct() {
    const productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      productWeight: [0, [Validators.required, Validators.min(0.01)]],
      orderId: [0],
    });
    this.productList.push(productForm);
  }
  removeProduct(index: number) {
    this.productList.removeAt(index);
  }
  loadBranches() {
    this.unitOfWork.Branch.getAll().subscribe(
      (data) => {
        this.branches = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadGovernments() {
    this.unitOfWork.Govern.getAll().subscribe(
      (data) => {
        this.governments = data.filter(
          (govern: { status: any }) => govern.status
        );
      },
      (err) => {
        console.error('Error loading governments', err);
      }
    );
  }
  onGovernmentChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const governID = selectElement.value;

    const selectedGovern = this.governments.find((g) => g.id === +governID);
    if (selectedGovern) {
      this.cities = selectedGovern.cities;
    } else {
      this.cities = [];
    }
  }
  onSubmit() {
    debugger;
    if (this.addOrderForm.valid) {
      const orderData: Order = {
        ...this.addOrderForm.value,
        productList: this.productList.value,
      };

      this.unitOfWork.Order.create(orderData).subscribe({
        next: (response) => {
          console.log('Order saved successfully', response);
          this.toaster.success('Order saved successfully', 'Success');
        },
        error: (err) => {
          console.error('Error saving order', err);
          this.toaster.error('Error saving order', 'Error');
        },
      });
    } else {
      console.log(this.addOrderForm.errors);
      console.log(this.addOrderForm.controls);
      console.log('Form is invalid!');
      this.toaster.error('Error saving order', 'Error');
    }
  }
  loadTypeOfPayments() {
    this.unitOfWork.TypeOfPayment.getAll().subscribe(
      (data) => {
        this.typeOfPayments = data;
      },
      (err) => {
        console.error('Error loading type of payments', err);
      }
    );
  }
  loadTypeOfCharges() {
    this.unitOfWork.TypeOfCharge.getAll().subscribe(
      (data) => {
        this.typeOfCharges = data;
      },
      (err) => {
        console.error('Error loading type of charges', err);
      }
    );
  }
  loadTypeOfReceipts() {
    this.unitOfWork.TypeOfReceipt.getAll().subscribe(
      (data) => {
        this.typeOfReceipts = data;
      },
      (err) => {
        console.error('Error loading type of receipts', err);
      }
    );
  }
  calculateTotalWeight() {
    const products = this.productList.value;
    let totalWeight = 0;
    products.forEach((product: any) => {
      totalWeight += product.productWeight * product.quantity;
    });
    this.addOrderForm
      .get('weight')
      ?.setValue(totalWeight, { emitEvent: false });
  }
}
