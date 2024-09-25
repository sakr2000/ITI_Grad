import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { AddSeller } from '../Models/Seller/addSeller.interface';

@Injectable({
  providedIn: 'root',
})
export class SellerService implements CRUD<any> {
  api = 'http://localhost:5298/api/Seller';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(`${this.api}/GetAll`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
  create(data: AddSeller): Observable<any> {
    return this.http.post('http://localhost:5298/AddSeller', data);
  }
  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data); // not finished yet
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
