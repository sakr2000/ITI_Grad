import { User } from './../../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../page-header/page-header.component';
import { RouterLink } from '@angular/router';
import { SellerService } from '../../../Services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { GetSeller } from '../../../Models/Seller/getSeller.interface';
import { UnitOfWorkService } from '../../../Services/unitOfWork.service';
import { UserDataService } from '../../../Services/userData.service';
import { FieldPrivilegeDTO } from '../../../Models/FieldJob';

@Component({
  selector: 'app-display-sellers',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink],
  templateUrl: './display-sellers.component.html',
  styleUrl: './display-sellers.component.css',
})
export class DisplaySellersComponent implements OnInit {
  data: GetSeller[] = [];
  Privileges!: FieldPrivilegeDTO;
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private toaster: ToastrService,
    public User: UserDataService
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this._unitOfWork.Selller.getAll().subscribe({
      next: (data) => {
        this.data = data;
      },

      error: (err) => {
        console.log(err);
      },
    });

    this.Privileges =
      this.User.getPrivileges()?.find((x) => x.name == 'التجار') ??
      ({} as FieldPrivilegeDTO);
  }

  delete(id: string) {
    this._unitOfWork.Selller.delete(id).subscribe({
      next: (data) => {
        this.data = this.data.filter((x) => x.id != id);
        this.toaster.success('تم الحذف بنجاح');
      },

      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message, 'خطأ');
      },
    });
  }
}
