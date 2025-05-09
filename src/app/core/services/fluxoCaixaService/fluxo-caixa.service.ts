import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FluxoCaixaService {

  private apiUrl = `${environment.apiUrl}/fluxo-caixa`;
  // private apiUrl = 'http://localhost:3000/api/fluxo-caixa';
  // private apiUrl = 'https://backend-cvm.vercel.app/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fluxos`, { headers: this.getHeaders() });
  }

  getByMonthYear(mes: number, ano: number): Observable<any> {
    const params = { mes: mes.toString().padStart(2, "0"), ano: ano.toString() };
    return this.http.get(`${this.apiUrl}/fluxos-mes`, {
      params,
      headers: this.getHeaders()
    });
  }


  getByIntervalData(dataInicial: string, dataFinal: string): Observable<any> {
    const params = { dataInicio: dataInicial, dataFim: dataFinal };
    return this.http.get(`${this.apiUrl}/fluxos-interval`, {
      params,
      headers: this.getHeaders()
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fluxo`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/fluxo/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fluxo/${id}`, { headers: this.getHeaders() });
  }
}
