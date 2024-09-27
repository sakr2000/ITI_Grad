import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { TypeOfCharge } from '../Models/TypeOfCharge';

@Injectable({
  providedIn: 'root',
})
export class TypeOfChargeService implements CRUD<any> {
  api = 'http://localhost:5298/api/TypeOfCharge';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(`${this.api}`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
  create(data: TypeOfCharge): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }
  update(id: number, data: any) {
    return this.http.put(this.api, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
