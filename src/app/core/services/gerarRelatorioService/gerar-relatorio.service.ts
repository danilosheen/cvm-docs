import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRelatorioMensal } from '../../../interfaces/i-relatorioMensal';

@Injectable({
  providedIn: 'root'
})
export class GerarRelatorioService {

  private apiUrl = `${environment.apiUrl}/pdf/gerar-relatorio`;

  constructor(private http:HttpClient) { }

  gerarRelatorio(data: IRelatorioMensal): Observable<Blob>{
    return this.http.post(this.apiUrl, data, { responseType: 'blob' })
  }
}
