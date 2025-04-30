import { Injectable } from '@angular/core';
import { ICliente } from '../../../interfaces/i-cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth-service.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.apiUrl}`;
  // private apiUrl = 'http://localhost:3000/api';
  // private apiUrl = 'https://backend-cvm.vercel.app/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes`, { headers: this.getHeaders() });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente`, data, { headers: this.getHeaders() });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cliente/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cliente/${id}`, { headers: this.getHeaders() });
  }












  // LocalStorage
  getAllClients(){
    let clientes: ICliente[] = JSON.parse(localStorage.getItem("clientes") || '[]');
    return clientes
  }

  saveClient(cliente: any, allClientes: ICliente[]) {
    const clienteExiste = allClientes.some((c: ICliente) => c.nome === cliente.nome);

    if (!clienteExiste) {
      let clientes: ICliente[] = JSON.parse(localStorage.getItem("clientes") || '[]');

      clientes.push(cliente);

      // Ordena por nome em ordem alfabética (case-insensitive)
      clientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));

      localStorage.setItem("clientes", JSON.stringify(clientes));
      return clientes;
    }

    return clienteExiste;
  }

}
