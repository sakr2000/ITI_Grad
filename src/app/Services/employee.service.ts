import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements CRUD<any> {
  api = 'https://localhost:5298/api/Employee';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }
  getById(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
