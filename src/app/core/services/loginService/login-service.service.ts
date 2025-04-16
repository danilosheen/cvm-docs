import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth-service.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/login';
  // private apiUrl = 'https://backend-cvm.vercel.app/api/login';


  constructor( private http: HttpClient, private authService: AuthService) {}

  login(email: string, senha: string): Observable<any> {
    const body = { email, senha };

    return this.http.post<{ token: string }>(this.apiUrl, body).pipe(
      tap(response => {
        if (response.token) {
          this.authService.setToken(response.token);
        }
      })
    );
  }
}
