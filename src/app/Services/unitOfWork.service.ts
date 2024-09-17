import { CityService } from './city.service';
import { BranchService } from './branch.service';
import { Injectable } from '@angular/core';
import { SellerService } from './seller.service';
import { GovernService } from './govern.service';
import { OrderService } from './order.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class UnitOfWorkService {
  constructor(
    public Selller: SellerService,
    public Govern: GovernService,
    public Branch: BranchService,
    public City: CityService,
    public Order: OrderService,
    public Employee: EmployeeService
  ) {}
}
