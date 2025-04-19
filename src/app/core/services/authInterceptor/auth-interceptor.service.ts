import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se for 401 e a mensagem for "Token expirado"
        if (error.status === 401 && error.error?.error === 'Token expirado') {
          localStorage.removeItem('authToken');
          alert('Sua sessão expirou, faça login novamente!');
          this.router.navigate(['/']);
        }

        // Se for 401 genérico (token inválido, por exemplo)
        if (error.status === 401 && error.error?.error === 'Token inválido') {
          localStorage.removeItem('authToken');
          alert('Sessão inválida. Faça login novamente.');
          this.router.navigate(['/']);
        }

        return throwError(() => error);
      })
    );
  }
}
