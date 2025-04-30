import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoPDFService {

  private apiUrl = `${environment.apiUrl}/pdf/orcamento`;
  // private apiUrl = 'http://localhost:3000/api/pdf/orcamento';
  // private apiUrl = 'https://backend-cvm.vercel.app/api/pdf/orcamento';

  constructor(private http: HttpClient) {}

  generatePDF(data: any): Observable<Blob> {
    return this.http.post(this.apiUrl, data, { responseType: 'blob' });
  }
}
