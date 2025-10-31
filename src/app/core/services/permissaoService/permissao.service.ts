import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  private apiUrl = `${environment.apiUrl}/permissoes`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getPermissoes(): Observable<any[]> {
    const token = this.authService.getToken();
    return this.http.get<any[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePermissao(idPermissao: string, permitido: boolean): Observable<any> {
    const token = this.authService.getToken();

    return this.http.put<any>(`${this.apiUrl}/${idPermissao}`, {
      permitido: permitido }, { headers: { Authorization: `Bearer ${token}` } });
  }
}
