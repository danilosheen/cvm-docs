export interface IOrcamentoHistory {
  id: string;
  nomeCliente: string;
  telefoneContato: string;
  localSaida: string;
  destinoViagem: string;
  dataSaida: string;
  horaSaida: string;
  dataRetorno: string;
  horaRetorno: string;
  valorComDespesa: number | string;
  valorSemDespesa: number | string;
  valorComNota: number | string;
  taxaPix: number | null;
  modeloVan?: string;
  cortesiaKm?: number | null;
  valorAcrescimoKm?: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
