import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { CRUD } from '../models/CRUD.interface';
@Injectable({
  providedIn: 'root'
})
export class OrderService implements CRUD<any> {
  url = 'http://localhost:5298/api/Order';
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/GetOrderById${id}`);
  }
  create(data: Order): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }
  update(id: number, data: Order): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.url}/GettAll`);
  }
}
