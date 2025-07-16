import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoHistoryService {

  private apiUrl = `${environment.apiUrl}/contrato-history`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }

    getContratoHistory(): Observable<any> {
      return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    }

    createContratoHistory(data: any) : Observable<any>{
      return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
    }

    removeContratoHistory(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}
