import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order';
import { CRUD } from '../Models/CRUD.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService implements CRUD<any> {
  url = 'http://localhost:5298/api/Order';
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/GetOrderById/${id}`);
  }
  create(data: Order): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }
  createByAdmin(data: Order): Observable<any> {
    return this.http.post(`http://localhost:5298/api/Order/AdminAddOrder`, data);
  }
  update(id:number, data: Order): Observable<any> {
    return this.http.put(`${this.url}`, data);
  }
  updateOrder( data: Order): Observable<any> {
    return this.http.put(`${this.url}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.url}/GettAll`);
  }
}
