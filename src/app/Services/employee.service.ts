import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { AddEmployee } from '../Models/Employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements CRUD<any> {
  api = 'http://localhost:5298/api/Employee';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.api}/getEmployee`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
  create(data: AddEmployee): Observable<any> {
    return this.http.post(
      this.api.replace('/api/Employee', '/AddEmployee'),
      data
    );
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
