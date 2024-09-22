import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5298/api/Order';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  saveOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}`, order);
  }
}
