import { Injectable } from '@angular/core';
import { ICliente } from '../../../interfaces/i-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() {}

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
