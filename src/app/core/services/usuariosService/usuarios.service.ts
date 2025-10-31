import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}/usuarios`, { headers: this.getHeaders() });
    }

    criarUsuario(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/usuario`, data, { headers: this.getHeaders() });
    }

    update(modulo: string, data: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/usuarios/${modulo}`, data, { headers: this.getHeaders() });
    }

    removerUsuario(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/usuario/${id}`, { headers: this.getHeaders() });
    }
}
