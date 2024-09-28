import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitOfWorkService } from '../../Services/unitOfWork.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addGovern } from '../../Models/Govern.interface';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { AddCityComponent } from '../add-city/add-city.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-cities',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    AddCityComponent,
  ],
  templateUrl: './edit-cities.component.html',
  styleUrl: './edit-cities.component.css',
})
export class EditCitiesComponent implements OnInit {
  id: number = 0;
  citiesList: any[] = [];
  @ViewChild(AddCityComponent) addCity!: AddCityComponent;
  editGovernForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });
  constructor(
    private _unitOfWork: UnitOfWorkService,
    private activeRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (data) => {
        this.id = parseInt(data['id']);
        this._unitOfWork.Govern.getById(this.id).subscribe(
          (data: addGovern) => {
            console.log(data);

            this.editGovernForm.patchValue(data);
            this.citiesList = data.cities;
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openModal(id: number) {
    id == 0 ? this.addCity.addModal(this.id) : this.addCity.editModal(id);
  }

  deleteCity(id: number) {
    this._unitOfWork.City.delete(id).subscribe({
      next: (data) => {
        console.log(data);
        this.toaster.success('تم الحذف بنجاح');
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
        this.toaster.error('لا يمكن حذف المدينة');
      },
    });
  }
  onSubmit() {
    this._unitOfWork.Govern.update(
      this.id,
      this.editGovernForm.value
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.toaster.success('تم التعديل بنجاح');
      },
      error: (err) => {
        console.log(err);
        this.toaster.error('حدث خطأ في عملية التعديل');
      },
    });
  }
}
