import { IFluxoCaixa } from "./i-fluxo-caixa";

export interface IRelatorioMensal {
  fluxos: IFluxoCaixa[],
  saldoAnterior: number,
  entradas: number,
  saidas: number,
  saldoRestante: number,
  mesAno: string,
  pdfName: string
}
