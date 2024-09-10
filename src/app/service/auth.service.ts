import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://your-api-url.com'; 

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, user, { headers }).pipe(
      map((response) => response)
    );
  }
}
