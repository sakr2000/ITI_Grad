import { Injectable } from '@angular/core';
import { CRUD } from '../Models/CRUD.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TypeOfOffer } from '../Models/TypeOFOffer.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeOfOfferService implements CRUD<TypeOfOffer> {
  api = 'http://localhost:5298/api/TypeOfOffer';
  constructor(private http: HttpClient) {}
  getAll(): Observable<TypeOfOffer[]> {
    return this.http.get<TypeOfOffer[]>(this.api);
  }
  getById(id: number | string): Observable<TypeOfOffer> {
    return this.http.get<TypeOfOffer>(`${this.api}/${id}`);
  }
  create(data: TypeOfOffer): Observable<TypeOfOffer> {
    return this.http.post<TypeOfOffer>(this.api, data);
  }
  update(id: number, data: TypeOfOffer): Observable<TypeOfOffer> {
    return this.http.put<TypeOfOffer>(this.api, data);
  }
  delete(id: number | string): Observable<TypeOfOffer> {
    return this.http.delete<TypeOfOffer>(`${this.api}/${id}`);
  }
}
