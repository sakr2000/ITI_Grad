import { Observable } from 'rxjs';

export interface CRUD<T> {
  getAll(): Observable<T[]>;
  getById(id: number | string): Observable<T>;
  create(data: T): Observable<T>;
  update(id: number, data: T): Observable<T>;
  delete(id: number | string): Observable<any>;
}
