import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../environments/env';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = env.apiUrl;
  constructor(private http: HttpClient) {}
  get<T>(path: string): Observable<T>           { return this.http.get<T>(`${this.base}${path}`); }
  post<T>(path: string, body: any): Observable<T> { return this.http.post<T>(`${this.base}${path}`, body); }
  put<T>(path: string, body: any): Observable<T>  { return this.http.put<T>(`${this.base}${path}`, body); }
  delete<T>(path: string): Observable<T>          { return this.http.delete<T>(`${this.base}${path}`); }
}
