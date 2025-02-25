export interface IOrcamento {
  nomeCliente: string;
  telefoneContato: string;
  pacoteViagem: string;
  localSaida: string;
  dataSaida: string;
  horaSaida: string;
  dataRetorno: string;
  horaRetorno: string;
  valor: string;
  modeloVan?: string;
  valorAcrescimoKm?: string;
}
