import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
import { IOrcamento } from '../../../interfaces/i-orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoHistoryService {

  private apiUrl = `${environment.apiUrl}/orcamento-history`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  getOrcamentoHistory(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  removeOrcamentoHistory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
