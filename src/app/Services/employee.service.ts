import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { AddEmployee } from '../Models/Employee/addEmployee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements CRUD<any> {
  api = 'http://localhost:5298';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.api}/api/Employee`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/api/Employee/${id}`);
  }
  create(data: AddEmployee): Observable<any> {
    return this.http.post(`${this.api}/AddEmployee`, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/api/Employee/${id}`, data);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/api/Employee/${id}`);
  }
}
