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
import { AddSeller } from '../../../Models/Seller.interface';
import { forkJoin } from 'rxjs';
import { GetBranch } from '../../../Models/Branch.interface';
import { GetGovern } from '../../../Models/Govern.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trader',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PageHeaderComponent],
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css'],
})
export class TraderComponent implements OnInit {
  traderForm!: FormGroup;
  id: string = '';
  governs: GetGovern[] = [];
  branches: GetBranch[] = [];
  PachageCities: { id: number; name: string }[][] = [];
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private _unitOfWork: UnitOfWorkService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.traderForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('01(0|1|2|5)[0-9]{8}'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      branchID: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_/$%^&*])[a-zA-Z0-9!@#$_/%^&*]{6,16}$/
          ),
        ],
      ],
      storeCityId: ['', Validators.required],
      storeName: ['', Validators.required],
      pickUp: ['', Validators.required],
      address: ['', Validators.required],
      valueOfRejectedOrder: ['', Validators.required],
      citySellers: this.fb.array([]),
    });
    forkJoin([
      this._unitOfWork.Branch.getAll(),
      this._unitOfWork.Govern.getAll(),
    ]).subscribe({
      next: ([branches, governs]) => {
        this.governs = governs;
        this.branches = branches;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.activatedRoute.params.subscribe({
      next: (data) => {
        this.id = data['id'];
        this._unitOfWork.Selller.getById(this.id).subscribe({
          next: (seller) => {
            console.log(seller);
            this.traderForm.patchValue(seller);
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCities(e: Event, select: HTMLSelectElement) {
    let selectedGovern = e.target as HTMLSelectElement;
    if (selectedGovern.value) {
      select.innerHTML =
        ' <option value="" disabled selected>اختر المدينة</option>';
      this.governs[selectedGovern.selectedIndex - 1].cities.forEach((city) => {
        select.appendChild(new Option(city.name, city.id.toString()));
      });
    }
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
    if (this.traderForm.valid) {
      this._unitOfWork.Selller.create(
        this.traderForm.value as AddSeller
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.toaster.success('تمت الاضافة بنجاح').onHidden.subscribe(() => {
            this._router.navigate(['/Seller']);
          });
        },
        error: (err) => {
          console.log(err);
          this.toaster.error('خطأ في الاضافة');
        },
      });
    }
  }

  onGovernChange(index: number, event: Event) {
    let selectedGovern = event.target as HTMLSelectElement;
    if (selectedGovern.value) {
      this.PachageCities[index] =
        this.governs.find((x) => x.id == parseInt(selectedGovern.value))
          ?.cities ?? [];
    }
  }
}
