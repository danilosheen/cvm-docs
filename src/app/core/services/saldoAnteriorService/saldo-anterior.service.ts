import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';

type SaldoAnterior = {
  ano: string,
  mes: string,
  saldoAnterior: number
}

@Injectable({
  providedIn: 'root'
})
export class SaldoAnteriorService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  private apiUrl = `${environment.apiUrl}/saldo-anterior`;


  adicionarSaldoAnterior(dataSaldoAnterior: SaldoAnterior): Observable<any>{
    return this.http.post(this.apiUrl, dataSaldoAnterior, {headers: this.getHeaders()})
  }

  buscarSaldoAnterior(mes: number, ano: number) : Observable<any>{
    const params = { mes: mes.toString().padStart(2, "0"), ano: ano.toString() };
    return this.http.get(this.apiUrl, {params: params, headers:this.getHeaders()})
  }

  atualizarSaldoAnterior(id: string, dataSaldoAnteior: SaldoAnterior) : Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, dataSaldoAnteior, {headers: this.getHeaders()})
  }

  removerSaldoAnterior(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.getHeaders()})
  }

}
