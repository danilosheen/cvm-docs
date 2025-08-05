export interface IOrcamento {
  nomeCliente: string;
  telefoneContato: string;
  localSaida: string;
  destinoViagem: string;
  dataSaida: string;
  horaSaida: string;
  dataRetorno: string;
  horaRetorno: string;
  valorComDespesa: number | null;
  valorSemDespesa: number | null;
  valorComNota: number | null;
  taxaPix: number | null;
  sinal: number;
  modeloVan?: string;
  cortesiaKm?: number | null;
  valorAcrescimoKm?: number | null;
}
