import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReciboPDFService {

   private apiUrl = 'http://localhost:3000/api/pdf/recibo';
    // private apiUrl = 'https://backend-cvm.vercel.app/api/pdf/recibo';

    constructor(private http: HttpClient) {}

    generatePDF(data: any): Observable<Blob> {
      return this.http.post(this.apiUrl, data, { responseType: 'blob' });
    }
}
