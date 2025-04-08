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

  saveClient(cliente: any, allClientes: ICliente[]){
    console.log(cliente, allClientes)
    const clienteExiste = allClientes.some((c: ICliente) => c.nome === cliente.nome);

    if (!clienteExiste) {
      let clientes: ICliente[] = JSON.parse(localStorage.getItem("clientes") || '[]');
      clientes.push(cliente);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      return clientes;
    }
    return clienteExiste;
  }
}
