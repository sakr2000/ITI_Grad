import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeightCharge } from '../Models/weightCharge.interface';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  api = 'http://localhost:5298/api/Weight';

  constructor(private http: HttpClient) {}
  getWeight() {
    return this.http.get(this.api);
  }

  setWeight(data: WeightCharge) {
    return this.http.post(this.api, data);
  }

  updateWeight(data: WeightCharge) {
    return this.http.put(this.api, data);
  }

  deleteWeight() {
    return this.http.delete(this.api);
  }
}
