import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5298/api/Account';

  constructor(private http: HttpClient) {}

  login(EmailOrUsername: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const payload = {
      email: EmailOrUsername.includes('@') ? EmailOrUsername : null,
      username: EmailOrUsername.includes('@') ? null : EmailOrUsername,
      password: Password,
    };
    return this.http.post(`${this.apiUrl}`, payload, { headers }).pipe(
      tap({
        next: (response: any) => {
          localStorage.setItem('token', response['token']);
        },
        error: (error) => {
          if (error.status === 400) {
            console.error('Bad request:', error.error.message);
          } else {
            console.error('An unexpected error occurred:', error.error.message);
          }
        },
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
