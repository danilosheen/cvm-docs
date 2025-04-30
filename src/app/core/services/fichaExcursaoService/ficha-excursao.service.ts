import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaExcursaoService {

  private apiUrl = `${environment.apiUrl}/pdf/ficha-excursao`;
  //  private apiUrl = 'http://localhost:3000/api/pdf/ficha-excursao';
  // private apiUrl = 'https://backend-cvm.vercel.app/api/pdf/ficha-excursao';

  constructor(private http: HttpClient) {}

  generatePDF(data: any): Observable<Blob> {
    return this.http.post(this.apiUrl, data, { responseType: 'blob' });
  }
}
