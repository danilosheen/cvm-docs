import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotratoService {

  private apiUrl = `${environment.apiUrl}/pdf/contrato`;

    constructor(private http: HttpClient) {}

    generatePDF(data: any): Observable<Blob> {
      return this.http.post(this.apiUrl, data, { responseType: 'blob' });
    }
}
