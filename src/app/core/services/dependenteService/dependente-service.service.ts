import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependenteService {

  private apiUrl = `${environment.apiUrl}`;
  // private apiUrl = 'http://localhost:3000/api';
  // private apiUrl = 'https://backend-cvm.vercel.app/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(idCliente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dependentes/${idCliente}`, { headers: this.getHeaders() });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/dependente`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/dependente/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/dependente/${id}`, { headers: this.getHeaders() });
  }
}
