import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService  {
    api = 'http://localhost:5298/api/Invoice/GenerateOrderPdfWithQRCode';
    constructor(private http: HttpClient) {}

    getById(id: number | string): Observable<any> {
        return this.http.get(`${this.api}?orderId=${id}`, { responseType: 'blob' });
    }

  }