import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { AddEmployee } from '../Models/addEmployee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements CRUD<any> {
  api = 'https://localhost:5298/api';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }
  getById(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  create(data: AddEmployee): Observable<any> {
    return this.http.post(`${this.api}/AddEmployee`, data);
  }
  update(id: number, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
