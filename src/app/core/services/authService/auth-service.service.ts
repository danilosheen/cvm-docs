import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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
  permissoes: string[] = [];

  constructor(){
    try {
      const stored = localStorage.getItem('permissoes');
      this.permissoes = stored ? JSON.parse(stored) : [];
    } catch {
      this.permissoes = [];
    }
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

  temPermissao(modulo: string): boolean {
    const decoded = this.getDecodedToken();
    if (decoded?.role === 'admin') return true;

    return this.permissoes.includes(modulo);
  }
}
