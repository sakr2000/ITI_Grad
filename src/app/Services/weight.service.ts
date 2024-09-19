import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  api = 'http://localhost:5298/api/WeightCharge';

  constructor(private http: HttpClient) {}

  //TODO : get weight from database
  getWeight() {
    return this.http.get(this.api);
  }
}
