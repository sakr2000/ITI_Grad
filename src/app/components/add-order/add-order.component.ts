import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BranchService } from '../../Services/branch.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order, Product } from '../../Models/Order';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { ActivatedRoute } from '@angular/router';

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
  orderId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private unitOfWork: UnitOfWorkService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      debugger
      if (id) {
        this.orderId = +id;
        this.isEditMode = true;
        this.loadOrderForEdit(this.orderId);
      }
    });
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
      sellerID:["8a5a6095-9b31-4693-9fc1-8a53c29a3e23"],
      productList: this.fb.array([]),
    });

    this.loadBranches();
    this.loadGovernments().add(() => {
      if (this.orderId) {
        this.loadOrderForEdit(this.orderId);
      }
    });
    this.loadTypeOfCharges();
    this.loadTypeOfPayments();
    this.loadTypeOfReceipts();
    this.addOrderForm.get('productList')?.valueChanges.subscribe(() => {
      this.calculateTotalWeight();
    });
  }
  loadOrderForEdit(orderId: number): void {
    this.unitOfWork.Order.getById(orderId).subscribe({
      next: (order) => {
        this.addOrderForm.patchValue(order);  
  
        
        const selectedGovern = this.governments.find(g => g.id === order.governID);
        if (selectedGovern) {
          this.cities = selectedGovern.cities;
        }
        this.addOrderForm.patchValue({
          cityID: order.cityID
        });this.productList.clear();
  
        order.productList.forEach((product: any) => this.addProduct(product));
      },
      error: (err) => {
        console.error('Error loading order data:', err);
        this.toaster.error('Failed to load order data', 'Error');
      }
    });
  }
  
  get productList(): FormArray {
    return this.addOrderForm.get('productList') as FormArray;
  }
  addProduct(product?: any) {
    const productForm = this.fb.group({
      name: [product?.name || '', Validators.required],
      quantity: [product?.quantity || 0, [Validators.required, Validators.min(1)]],
      productWeight: [product?.productWeight || 0, [Validators.required, Validators.min(0.01)]],
      orderId: [product?.orderId || 0],
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
    return this.unitOfWork.Govern.getAll().subscribe(
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
    if (this.addOrderForm.valid) {
      const orderDataa = {
        id: this.orderId ? this.orderId : 0,  
        clientName: this.addOrderForm.value.clientName,
        clientNumber: this.addOrderForm.value.clientNumber,
        clientNumber2: this.addOrderForm.value.clientNumber2 || '',  
        email: this.addOrderForm.value.email,
        cost: this.addOrderForm.value.cost,
        isForVillage: this.addOrderForm.value.isForVillage,
        note: this.addOrderForm.value.note || '',  
        weight: this.addOrderForm.value.weight,
        villageOrStreet: this.addOrderForm.value.villageOrStreet,
        sellerID:"8a5a6095-9b31-4693-9fc1-8a53c29a3e23",
        branchID: +this.addOrderForm.value.branchID, 
        governID: +this.addOrderForm.value.governID,
        cityID: +this.addOrderForm.value.cityID,
        typeOfPaymentID: +this.addOrderForm.value.typeOfPaymentID,
        typeOfChargeID: +this.addOrderForm.value.typeOfChargeID,
        orderStatusID: this.addOrderForm.value.orderStatusID,
        typeOfReceiptID: +this.addOrderForm.value.typeOfReceiptID,
        productList: this.addOrderForm.value.productList.map((product: any) => ({
          id: product.id || 0,  
          name: product.name,
          quantity: product.quantity,
          productWeight: product.productWeight,
          orderId: this.orderId || 0  
        }))
      };
      if (this.orderId) {
        
        this.unitOfWork.Order.updateOrder( orderDataa).subscribe({
          next: () => this.toaster.success('Order updated successfully', 'Success'),
          error: (err) => this.toaster.error('Error updating order', 'Error')
        });
      } else {
        
        this.unitOfWork.Order.create(orderDataa).subscribe({
          next: () => this.toaster.success('Order created successfully', 'Success'),
          error: (err) => this.toaster.error('Error creating order', 'Error')
        });
      }
    } else {
      this.toaster.error('Invalid form data', 'Error');
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
