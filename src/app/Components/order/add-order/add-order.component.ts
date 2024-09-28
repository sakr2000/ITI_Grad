import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { addOrder, updateOrder } from '../../../Models/Order.interface';
import { UserDataService } from '../../../Services/userData.service';
import { Observable, tap, catchError, of } from 'rxjs';

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
  orderId:number | null = null;
  isEditMode:boolean=false;
  sellers: any;
  user:any;

  constructor(
    private fb: FormBuilder,
    private unitOfWork: UnitOfWorkService,
    private toaster: ToastrService,
    private router: Router,
    private route:ActivatedRoute,
    public userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.user = this.userDataService.getUserData();
    if (this.userDataService.isAdmin()) {
      this.loadSellers(); 
    } else if (this.userDataService.isSeller()) {
      const sellerID = this.user?.id;
      const combinedAddress = `${this.user.govern}, ${this.user.city}, ${this.user.storeName}`;
          this.addOrderForm.get('sellerPhoneNumber')?.setValue(this.user.phone);
          this.addOrderForm.get('sellerAddress')?.setValue(combinedAddress);
      this.addOrderForm.get('sellerID')?.setValue(sellerID); 
    }
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
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
      sellerID: ['',Validators.required],
      sellerPhoneNumber: [''],
      sellerAddress: [''],
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
    debugger
    this.unitOfWork.Order.getById(orderId).subscribe({
      next: (order) => {
        this.addOrderForm.patchValue(order);  
  
        
        const selectedGovern = this.governments.find(g => g.name === order.governName);
      if (selectedGovern) {
        this.cities = selectedGovern.cities; 
        this.addOrderForm.patchValue({
          governID: selectedGovern.id 
        });
        const selectedCity = selectedGovern.cities.find((c: { name: any; }) => c.name === order.cityName);
        if (selectedCity) {
          this.addOrderForm.patchValue({
            cityID: selectedCity.id
          });
        }
      }
      
      const sellerId = order.sellerID; 
      if (sellerId) {
        this.addOrderForm.patchValue({
          sellerID: sellerId 
        });

        this.unitOfWork.Selller.getById(sellerId).subscribe({
          next: (seller) => {
            const combinedAddress = `${seller.govern}, ${seller.city}, ${seller.storeName}`;
            this.addOrderForm.get('sellerPhoneNumber')?.setValue(seller.phone);
            this.addOrderForm.get('sellerAddress')?.setValue(combinedAddress);
          },
          error: (err) => {
            console.error('Error fetching seller details:', err);
            this.toaster.error('خطا في تحميل بيانات التاجر', 'Error');
          },
        });
      }
      this.productList.clear();
      order.productList.forEach((product: any) => this.addProduct(product));
      },
      error: (err) => {
        console.error('Error loading order data:', err);
        this.toaster.error('خطا في تحميل بيانات الطلب', 'Error');
      }
    });
  }

  loadSellers() {
    this.unitOfWork.Selller.getAll().subscribe({
      next: (data) => {
        this.sellers = data;
      },
      error: (err) => {
        console.error('Error loading sellers', err);
      },
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

    if (this.addOrderForm.valid && this.productList.length > 0) {
      if (this.isEditMode && this.orderId != null) {
        const orderData: updateOrder = {
          ...this.addOrderForm.value,
          id: this.orderId,
          productList: this.productList.value,
        };
        this.unitOfWork.Order.update(0,orderData).subscribe({
          next: (response) => {
            console.log('Order updated successfully', response);
            this.toaster
              .success('تم تحديث الطلب بنجاح', 'نجاح')
              .onHidden.subscribe({
                next: () => {
                  this.router.navigate(['/Order']);
                },
              });
          },
          error: (err) => {
            console.error('Error updating order', err);
            this.toaster.error('حدث خطأ عند تحديث الطلب', 'خطأ');
          },
        });
      } else {
       
        const orderData: addOrder = {
          ...this.addOrderForm.value,
          productList: this.productList.value,
        };
        if(this.userDataService.isAdmin()){
          this.unitOfWork.Order.createForAdmin(orderData).subscribe({
            next: (response) => {
              console.log('Order saved successfully', response);
              this.toaster
                .success('تم حفظ الطلب بنجاح', 'نجاح')
                .onHidden.subscribe({
                  next: () => {
                    this.router.navigate(['/Order']);
                  },
                });
            },
            error: (err) => {
              console.error('Error saving order', err);
              this.toaster.error(' حدث خطأ عند حفظ الطلب لك كمسؤل', 'خطأ');
            },
          });
        }
        else if(this.userDataService.isSeller()){
          this.unitOfWork.Order.create(orderData).subscribe({
            next: (response) => {
              console.log('Order saved successfully', response);
              this.toaster
                .success('تم حفظ الطلب بنجاح', 'نجاح')
                .onHidden.subscribe({
                  next: () => {
                    this.router.navigate(['/Order']);
                  },
                });
            },
            error: (err) => {
              console.error('Error saving order', err);
              this.toaster.error(' حدث خطأ عند حفظ الطلب لك كتاجر', 'خطأ');
            },
          });
        }
       
      }
    } else if (this.addOrderForm.valid && this.productList.length == 0) {
      this.toaster.error('رجاءً تأكد من اضافة المنتجات', 'خطأ');
    } else {
      this.addOrderForm.markAllAsTouched();
      this.toaster.error('رجاءً تأكد من المعلومات المدخلة', 'خطأ');
    }
  }
  
  loadTypeOfPayments() {
    this.unitOfWork.TypeOfPayment.getAll().subscribe({
      next: (data) => {
        this.typeOfPayments = data;
      },
      error: (err) => {
        console.error('Error loading type of payments', err);
      },
    });
  }
  loadTypeOfCharges() {
    this.unitOfWork.TypeOfCharge.getAll().subscribe({
      next: (data) => {
        this.typeOfCharges = data;
      },
      error: (err) => {
        console.error('Error loading type of charges', err);
      },
    });
  }
  loadTypeOfReceipts() {
    this.unitOfWork.TypeOfReceipt.getAll().subscribe({
      next: (data) => {
        this.typeOfReceipts = data;
      },
      error: (err) => {
        console.error('Error loading type of receipts', err);
      },
    });
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
  onSellerChange(event: Event): void {
    const sellerId = (event.target as HTMLSelectElement).value;
    debugger
    if (sellerId) {
      this.unitOfWork.Selller.getById(sellerId).subscribe({
        next: (seller) => {
          const combinedAddress = `${seller.govern}, ${seller.city}, ${seller.storeName}`;
          this.addOrderForm.get('sellerPhoneNumber')?.setValue(seller.phone);
          this.addOrderForm.get('sellerAddress')?.setValue(combinedAddress);
        },
        error: (err) => {
          console.error('Error fetching seller details:', err);
          this.toaster.error('خطا في تحميل بيانات التاجر', 'Error');
        },
      });
    }
  }
}
