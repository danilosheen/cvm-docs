import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaAgradecimentoService {

  private apiUrl = `${environment.apiUrl}/pdf/nota-agradecimento`;
  // private apiUrl = 'http://localhost:3000/api/pdf/nota-agradecimento';
  // private apiUrl = 'https://backend-cvm.vercel.app/api/pdf/nota-agradecimento';

  constructor(private http: HttpClient) {}

  generatePDF(data: any): Observable<Blob> {
    return this.http.post(this.apiUrl, data, { responseType: 'blob' });
  }
}
