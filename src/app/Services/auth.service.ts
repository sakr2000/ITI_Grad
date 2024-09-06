import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5298/api/Account';

  constructor(private http: HttpClient) {}

  // login(user: User): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http
  //     .post(`${this.apiUrl}/login`, user, { headers })
  //     .pipe(map((response) => response));
  // }

  login(EmailOrUsername: string, Password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { EmailOrUsername, Password }).pipe(
      tap((response) => {
        // Handle token storage or any other login response handling here
        // localStorage.setItem('token', response.token);
        console.log(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
