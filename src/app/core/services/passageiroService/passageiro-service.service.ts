import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PassageiroService {

  private apiUrl = 'http://localhost:3000/api';
    // private apiUrl = 'https://backend-cvm.vercel.app/api';

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}/passageiros`, { headers: this.getHeaders() });
    }

    create(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/passageiro`, data, { headers: this.getHeaders() });
    }

    update(id: string, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/passageiro/${id}`, data, { headers: this.getHeaders() });
    }

    delete(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/passageiro/${id}`, { headers: this.getHeaders() });
    }
}
