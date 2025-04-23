export interface IOrcamento {
  nomeCliente: string;
  telefoneContato: string;
  localSaida: string;
  destinoViagem: string;
  dataSaida: string;
  horaSaida: string;
  dataRetorno: string;
  horaRetorno: string;
  valorComDespesa: string;
  valorSemDespesa: string;
  valorComNota: string;
  taxaPix: string;
  modeloVan?: string;
  cortesiaKm?: string;
  valorAcrescimoKm?: string;
}
