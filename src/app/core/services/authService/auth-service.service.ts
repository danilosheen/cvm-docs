import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubjectService } from '../behaviorSubjectService/behavior-subject.service';
import { firstValueFrom } from 'rxjs';

interface DecodedToken {
  userId: number;
  role: string;
  permissoes?: { modulo: string; permitido: boolean }[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'authToken';
  private decodedToken: DecodedToken | null = null;

  permissoesBehaviorSubject = inject(BehaviorSubjectService);
  permissoes: string[] = [];

  constructor(){
    this.permissoesBehaviorSubject.permissoes$.subscribe({
      next:(result) =>{
        this.permissoes = result;
      }
    });
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.decodedToken = jwtDecode<DecodedToken>(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.decodedToken = null;
  }

  getDecodedToken(): DecodedToken | null {
    if (!this.decodedToken) {
      const token = this.getToken();
      if (token) this.decodedToken = jwtDecode<DecodedToken>(token);
    }
    return this.decodedToken;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.getDecodedToken();
    if (!decoded) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  getUserRole(): string | null {
    return this.getDecodedToken()?.role || null;
  }

  async temPermissao(modulo: string): Promise<boolean> {
    const decoded = this.getDecodedToken();
    if (decoded?.role === 'admin') return true;

    const permissoes = await firstValueFrom(this.permissoesBehaviorSubject.permissoes$);

    return permissoes.includes(modulo);
  }
}
