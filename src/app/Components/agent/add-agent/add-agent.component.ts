import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { GetGovern } from '../../../Models/Govern/getGovern.interface';
import { GetBranch } from '../../../Models/Branch/getBranch.interface';
import { CommonModule } from '@angular/common';
import { TypeOfOffer } from '../../../Models/TypeOFOffer.interface';

@Component({
  selector: 'app-add-agent',
  standalone: true,
  imports: [PageHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.css',
})
export class AddAgentComponent implements OnInit {
  agentForm!: FormGroup;
  governments: GetGovern[] = [];
  branches: GetBranch[] = [];
  typeOfOffers: TypeOfOffer[] = [];
  constructor(
    private fb: FormBuilder,
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
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
      phone: [
        '',
        [Validators.required, Validators.pattern('01(0|1|2|5)[0-9]{8}')],
      ],
      branchID: ['', [Validators.required]],
      governID: ['', [Validators.required]],
      address: ['', [Validators.required]],
      typeOfOfferID: ['', [Validators.required]],
      thePrecentageOfCompanyFromOffer: ['', [Validators.required]],
    });
    forkJoin([
      this._unitOfWork.Branch.getAll(),
      this._unitOfWork.Govern.getAll(),
      this._unitOfWork.TypeOfOffer.getAll(),
    ]).subscribe({
      next: ([branches, governs, typeOfOffers]) => {
        this.branches = branches;
        this.governments = governs;
        this.typeOfOffers = typeOfOffers;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.agentForm.valid) {
      this._unitOfWork.Agent.create(this.agentForm.value).subscribe({
        next: () => {
          this.toaster.success('تم الاضافة بنجاح');
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error.message, 'خطأ');
        },
      });
    }
  }
}
