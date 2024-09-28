import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityService implements CRUD<any> {
  api = 'http://localhost:5298/api/City';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.api);
  }
  getById(id: number | string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(this.api, { id, ...data });
  }
  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
