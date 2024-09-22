import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraderDashboardService {
  private apiUrl = 'https://your-api-url.com/orders';

  constructor(private http: HttpClient) {}

  getOrderCounts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
