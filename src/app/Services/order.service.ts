import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addOrder, updateOrder } from '../Models/Order.interface';
import { CRUD } from '../Models/CRUD.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService implements CRUD<any> {
  url = 'http://localhost:5298/api/Order';
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/GetOrderById/${id}`);
  }
  createForAdmin(data: addOrder): Observable<any> {
    return this.http.post(
      `http://localhost:5298/api/Order/AdminAddOrder`,
      data
    );
  }
  create(data: addOrder): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }
  update(id: number, data: updateOrder): Observable<any> {
    return this.http.put(`${this.url}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.url}/GetAll`);
  }

  print(id: number): Observable<any> {
    return this.http.get(`${this.url}/Print/${id}`);
  }

  changeOrderStatus(id: number, statusId: number): Observable<any> {
    return this.http.put(`${this.url}/ChangeOrderStatus/`, {
      id: id,
      orderStatusID: statusId,
    });
  }

  AssignToAgent(id: number, agentId: number): Observable<any> {
    return this.http.put(`${this.url}/AssignToAgent/`, {
      orderID: id,
      agentID: agentId,
    });
  }

  rejectOrder(id: number, rejectReason: string): Observable<any> {
    return this.http.put(`${this.url}/RejectOrder/`, {
      orderId: id,
      message: rejectReason,
    });
  }
}
