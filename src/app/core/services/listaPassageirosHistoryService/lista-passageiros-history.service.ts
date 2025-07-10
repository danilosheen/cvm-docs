import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaPassageirosHistoryService {

 private apiUrl = `${environment.apiUrl}/lista-passageiros-history`;

   constructor(private http: HttpClient, private authService: AuthService) {}

   private getHeaders(): HttpHeaders {
       const token = this.authService.getToken();
       return new HttpHeaders({
         'Authorization': `Bearer ${token}`
       });
     }

   getListaPassageirosHistory(): Observable<any> {
     return this.http.get(this.apiUrl, { headers: this.getHeaders() });
   }

   createListaPassageirosHistory(data: any) : Observable<any>{
     return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
   }

   removeListaPassageirosHistory(id: string): Observable<any> {
     return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
   }
}
