import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import { GetAgent } from '../../Models/Agent.interface';
import { catchError, Observable, of } from 'rxjs';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDataService } from '../../Services/userData.service';
import { ToastrService } from 'ngx-toastr';
import { OrderStatus, statusTranslations } from '../../Models/Order.interface';
@Component({
  selector: 'app-change-order-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-order-status.component.html',
  styleUrl: './change-order-status.component.css',
})
export class ChangeOrderStatusComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef;
  @Output() statusChanged = new EventEmitter();
  Statuses: OrderStatus[] = [];
  form!: FormGroup;
  agents$!: Observable<GetAgent[]>;

  constructor(
    private _unitOfWork: UnitOfWorkService,
    private user: UserDataService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      orderId: [null, Validators.required],
      status: [null, Validators.required],
      rejectReason: [''],
      agentID: [null],
    });
    this.loadStatuses();
    this.agents$ = this.getAllAgents();

    this.form.get('status')?.valueChanges.subscribe((statusId) => {
      const selectedStatusName = this.getStatusName(statusId);
      if (selectedStatusName === 'مرفوض') {
        this.form.get('rejectReason')?.setValidators(Validators.required);
      } else {
        this.form.get('rejectReason')?.clearValidators();
      }

      if (selectedStatusName === 'تسليم لمندوب') {
        this.form.get('agentID')?.setValidators(Validators.required);
      } else {
        this.form.get('agentID')?.clearValidators();
      }

      this.form.get('rejectReason')?.updateValueAndValidity();
      this.form.get('agentID')?.updateValueAndValidity();
    });
  }
  loadStatuses() {
    this._unitOfWork.OrderStatus.getAll().subscribe({
      next: (response: OrderStatus[]) => {
        this.Statuses = response.map((status) => ({
          ...status,
          name: statusTranslations[status.name] || status.name,
        }));
        this.Statuses = this.Statuses.map((s) => {
          if (s.name == 'تم التسليم للمندوب') {
            return { ...s, name: 'تسليم لمندوب' };
          }
          return s;
        });
        if (this.user.isEmployee()) {
          this.Statuses = this.Statuses.filter((status) =>
            [
              'جديد',
              'قيد الانتظار',
              'تسليم لمندوب',
              'مرفوض',
              'غير قابل للتسليم',
            ].includes(status.name)
          );
        } else if (this.user.isAgent()) {
          this.Statuses = this.Statuses.filter(
            (status) =>
              ![
                'جديد',
                'قيد الانتظار',
                'تسليم لمندوب',
                'مرفوض',
                'غير قابل للتسليم',
              ].includes(status.name)
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllAgents(): Observable<GetAgent[]> {
    return this._unitOfWork.Agent.getAll().pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  get selectedStatusName(): string {
    return (
      this.Statuses.find((s) => s.id == this.form.get('status')?.value)?.name ||
      ''
    );
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  getStatusName(id: number | null): string {
    return this.Statuses.find((s) => s.id == id)?.name || '';
  }

  save() {
    if (this.form.invalid) {
      this.toaster.warning('تأكد من صحة البيانات ', 'من فضلك');
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    if (
      this.getStatusName(formData.status) === 'مرفوض' &&
      formData.rejectReason
    ) {
      this._unitOfWork.Order.rejectOrder(
        formData.orderId,
        formData.rejectReason
      ).subscribe({
        next: (response) => {
          this.toaster.success('تم الحفظ بنجاح', 'نجاح').onShown.subscribe({
            next: () => {
              this.statusChanged.emit();
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (
      this.getStatusName(formData.status) === 'تسليم لمندوب' &&
      formData.agentID
    ) {
      this._unitOfWork.Order.AssignToAgent(
        formData.orderId,
        formData.agentID
      ).subscribe({
        next: (response) => {
          this.toaster.success('تم الحفظ بنجاح', 'نجاح').onShown.subscribe({
            next: () => {
              this.statusChanged.emit();
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this._unitOfWork.Order.changeOrderStatus(
        formData.orderId,
        formData.status
      ).subscribe({
        next: (response) => {
          this.toaster.success('تم الحفظ بنجاح', 'نجاح').onShown.subscribe({
            next: () => {
              this.statusChanged.emit();
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.closeModal();
  }
}
