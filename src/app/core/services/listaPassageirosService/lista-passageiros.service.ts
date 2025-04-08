import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaPassageirosService {


  //  private apiUrl = 'http://localhost:3000/api/pdf/lista-passageiros';
  private apiUrl = 'https://backend-cvm.vercel.app/api/lista-passageiros';

  constructor(private http: HttpClient) { }

  generatePDF(data: any): Observable<Blob> {
    return this.http.post(this.apiUrl, data, { responseType: 'blob' });
  }
}
