import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.apiUrl}/pdf/feliz-aniversario`;

  constructor(private http: HttpClient) {}

  enviarEmailAniversario(data: any): Observable<object> {
    return this.http.post(this.apiUrl, data);
  }
}
