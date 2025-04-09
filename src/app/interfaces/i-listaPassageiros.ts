import { IPassageiro } from "./i-passageiro";

export interface IListaPassageiros {
  numeroCarro: string,
  placa: string,
  motorista: string,
  origem: string,
  destino: string,
  dataSaida: string,
  horaSaida: string,
  dataRetorno: string,
  horaRetorno: string,
  extensaoRoteiroKm: string,
  passageiros: IPassageiro[]
}
