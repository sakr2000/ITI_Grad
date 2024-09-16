import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../Components/page-header/page-header.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GovernService } from '../../Services/govern.service';
import { ActivatedRoute } from '@angular/router';
import { Govern } from '../../Models/govern.model';

@Component({
  selector: 'app-add-govern',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './add-govern.component.html',
  styleUrl: './add-govern.component.css',
})
export class AddGovernComponent implements OnInit {
  GovernFrom: FormGroup;
  governs = [];
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private _governService: GovernService,
    private _activeRoute: ActivatedRoute
  ) {
    this.GovernFrom = this.fb.group({
      name: ['', Validators.required],
      cities: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this._governService
          .getGovernById(params['id'])
          .subscribe((data: Govern) => {
            console.log(data);

            this.GovernFrom.patchValue(data);
            for (let city of data.cities) {
              this.Cities.push(this.fb.group(city));
            }
          });
      }
    });
  }

  get Cities() {
    return this.GovernFrom.get('cities') as FormArray;
  }

  addCity() {
    let newCity = this.fb.group({
      name: ['', Validators.required],
      normalCharge: ['', Validators.required],
      pickUpCharge: ['', Validators.required],
      specialChargeForSeller: [null],
    });

    this.Cities.push(newCity);
  }

  onSubmit() {
    if (this.GovernFrom.valid) {
      console.log(this.GovernFrom.value);
      if (this.id == 0) {
        this._governService
          .addGovern(this.GovernFrom.value as Govern)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
      } else {
        this._governService
          .editGovern(this.id, this.GovernFrom.value as Govern)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
      }
    }
  }
}
