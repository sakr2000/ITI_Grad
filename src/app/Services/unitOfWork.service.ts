import { CityService } from './city.service';
import { BranchService } from './branch.service';
import { Injectable } from '@angular/core';
import { SellerService } from './seller.service';
import { GovernService } from './govern.service';
import { OrderService } from './order.service';
import { EmployeeService } from './employee.service';
import { FieldJobService } from './FieldJob.service';
import { WeightService } from './weight.service';
import { TypeOfPaymentService } from './TypeOfPayment.service';
import { TypeOfReceiptService } from './TypeOfReceipts.service';
import { AgentService } from './agent.service';
import { TypeOfOfferService } from './type-of-offer.service';
import { TypeOfChargeService } from './TypeOfCharge.service';

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
    public Employee: EmployeeService,
    public FieldJob: FieldJobService,
    public Agent: AgentService,
    public Weight: WeightService,
    public TypeOfPayment: TypeOfPaymentService,
    public TypeOfReceipt: TypeOfReceiptService,
    public TypeOfCharge: TypeOfChargeService,
    public TypeOfOffer: TypeOfOfferService
  ) {}
}
