import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../authService/auth-service.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private auth = inject(AuthService);
  private router = inject(Router)

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const modulo = route.data['modulo'];

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.auth.temPermissao(modulo)) {
      alert('Você não tem permissão para acessar esta página.');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
