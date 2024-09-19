import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { AddSeller } from '../Models/addSeller.interface';

@Injectable({
  providedIn: 'root',
})
export class SellerService implements CRUD<any> {
  api = 'http://localhost:5298/api';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(`${this.api}/Seller/GetAll`);
  }
  getById(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: AddSeller): Observable<any> {
    return this.http.post(`${this.api}/AddSeller`, data);
  }
  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
