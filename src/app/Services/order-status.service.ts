import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService implements CRUD<any> {
  api = 'http://localhost:5298/api/OrderStatus';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }
  getById(id: number | string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(this.api, data);
  }
  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
