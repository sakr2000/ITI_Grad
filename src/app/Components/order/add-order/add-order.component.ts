import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { addOrder, updateOrder } from '../../../Models/Order.interface';
import { UserDataService } from '../../../Services/userData.service';

@Component({
  selector: 'app-add-order',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, PageHeaderComponent],
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
  sellers: any;
  orderId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private unitOfWork: UnitOfWorkService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
    this.handleEditOrder();
  }

  private initializeForm() {
    this.addOrderForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')]],
      clientNumber: ['', [Validators.required, Validators.pattern('01(0|1|2|5)[0-9]{8}'), Validators.minLength(11), Validators.maxLength(11)]],
      clientNumber2: ['', [Validators.pattern('01(0|1|2|5)[0-9]{8}'), Validators.minLength(11), Validators.maxLength(11)]],
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
      sellerID: ['', Validators.required],
      sellerPhoneNumber: [''],
      sellerAddress: [''],
      productList: this.fb.array([]),
    });

    this.addOrderForm.get('productList')?.valueChanges.subscribe(() => this.calculateTotalWeight());
  }
  
  private loadInitialData() {
    if (this.userDataService.isAdmin()) {
      this.loadSellers();
    } else if (this.userDataService.isSeller()) {
      this.loadSellerData();
    }
    this.loadBranches();
    this.loadGovernments().add(() => this.handleEditOrder());
    this.loadTypeOfCharges();
    this.loadTypeOfPayments();
    this.loadTypeOfReceipts();
  }

  private handleEditOrder() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      if (id) {
        this.orderId = +id;
        this.isEditMode = true;
        this.loadOrderForEdit(this.orderId);
      }
    });
  }

  private loadOrderForEdit(orderId: number): void {
    this.unitOfWork.Order.getById(orderId).subscribe({
      next: order => {
        this.addOrderForm.patchValue(order);
        this.handleGovernmentAndCitySelection(order);
        this.loadSellerInfo(order.sellerID);
        this.loadProductList(order.productList);
      },
      error: () => this.toaster.error('خطا في تحميل الطلب', 'خطا'),
    });
  }

  private handleGovernmentAndCitySelection(order: any) {
    const selectedGovern = this.governments.find(g => g.name === order.governName);
    if (selectedGovern) {
      this.cities = selectedGovern.cities;
      this.addOrderForm.patchValue({ governID: selectedGovern.id });
      const selectedCity = selectedGovern.cities.find((c: { name: any; }) => c.name === order.cityName);
      if (selectedCity) {
        this.addOrderForm.patchValue({ cityID: selectedCity.id });
      }
    }
  }

  private loadSellerInfo(sellerId: string) {
    if (sellerId) {
      this.unitOfWork.Selller.getById(sellerId).subscribe({
        next: seller => {
          const combinedAddress = `${seller.govern}, ${seller.storeName}`;
          this.addOrderForm.patchValue({ sellerPhoneNumber: seller.phone, sellerAddress: combinedAddress });
        },
        error: () => this.toaster.error('خطا في تحميل بيانات التاجر', 'خطا'),
      });
    }
  }

  private loadSellers() {
    this.unitOfWork.Selller.getAll().subscribe({
      next: data => (this.sellers = data),
      error: () => console.error('خطا في تحميل البائعين'),
    });
  }

  private loadSellerData() {
    const sellerID = this.userDataService.getUserData()?.id;
    if (sellerID) {
      this.addOrderForm.patchValue({ sellerID });
      this.loadSellerInfo(sellerID);
    }
  }

  get productList(): FormArray {
    return this.addOrderForm.get('productList') as FormArray;
  }

  private loadProductList(products: any[]) {
    this.productList.clear();
    products.forEach(product => this.addProduct(product));
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
    this.unitOfWork.Branch.getAll().subscribe({
      next: data => (this.branches = data),
      error: err => console.log(err),
    });
  }

  loadGovernments() {
    return this.unitOfWork.Govern.getAll().subscribe({
      next: data => (this.governments = data.filter((govern: { status: any; }) => govern.status)),
      error: err => console.error('خطا في تحميل المحافظات', err),
    });
  }

  loadTypeOfPayments() {
    this.unitOfWork.TypeOfPayment.getAll().subscribe({
      next: data => (this.typeOfPayments = data),
      error: err => console.error('خطا في تحميل طرق الدفع', err),
    });
  }

  loadTypeOfCharges() {
    this.unitOfWork.TypeOfCharge.getAll().subscribe({
      next: data => (this.typeOfCharges = data),
      error: err => console.error('خطا في تحميل طرق التحصيل', err),
    });
  }

  loadTypeOfReceipts() {
    this.unitOfWork.TypeOfReceipt.getAll().subscribe({
      next: data => (this.typeOfReceipts = data),
      error: err => console.error('خطا في تحميل طرق الاستلام', err),
    });
  }

  calculateTotalWeight() {
    const totalWeight = this.productList.value.reduce((acc: number, product: any) => acc + product.productWeight * product.quantity, 0);
    this.addOrderForm.patchValue({ weight: totalWeight }, { emitEvent: false });
  }

  onSubmit() {
    if (!this.addOrderForm.valid || this.productList.length === 0) {
      this.addOrderForm.markAllAsTouched();
      this.toaster.error('تاكد من ملئ الحقول و اضافه منتجات', 'خطا');
      return;
    }

    const orderData = { ...this.addOrderForm.value, productList: this.productList.value };
    if (this.isEditMode && this.orderId != null) {
      this.updateOrder(orderData);
    } else {
      this.createOrder(orderData);
    }
  }

  private updateOrder(orderData: updateOrder) {
    this.unitOfWork.Order.update(0, { ...orderData, id: this.orderId! }).subscribe({
      next: () => this.toaster.success('تم تحديث الطلب بنجاح', 'تمت العمليه').onHidden.subscribe(() => this.router.navigate(['/Order'])),
      error: () => this.toaster.error('خطا في تعديل الطلب', 'خطا'),
    });
  }

  private createOrder(orderData: addOrder) {
    const saveOrder$ = this.userDataService.isAdmin() ? this.unitOfWork.Order.createForAdmin(orderData) : this.unitOfWork.Order.create(orderData);
    saveOrder$.subscribe({
      next: () => this.toaster.success('تم انشاء الطلب بنجاح', 'تمت العمليه').onHidden.subscribe(() => this.router.navigate(['/Order'])),
      error: () => this.toaster.error('خطا في انشاء الطلب', 'خطا'),
    });
  }

  ChangeGovern(event: any) {
    const selectedGovern = this.governments.find(govern => govern.id == event.target.value);
    if (selectedGovern) {
      this.cities = selectedGovern.cities;
    }
  }
  onSellerChange(event: any) {
    const selectedSellerId = event.target.value;
    if (selectedSellerId) {
      this.unitOfWork.Selller.getById(selectedSellerId).subscribe({
        next: (seller) => {
          const combinedAddress = `${seller.govern}, ${seller.storeName}`;
          this.addOrderForm.patchValue({
            sellerPhoneNumber: seller.phone,
            sellerAddress: combinedAddress,
          });
        },
        error: () => {
          this.toaster.error('خطا في تحميل بيانات التاجر', 'خطا');
        },
      });
    }
  }
}
