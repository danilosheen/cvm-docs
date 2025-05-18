import { IDependente } from "./i-dependente"

export interface IFichaExcursao {
  excursaoPara: string,
  localSaida: string,
  dataSaida: string,
  horaSaida: string,
  dataRetorno: string,
  horaRetorno: string,
  cliente: {
    id?: string,
    nome: string,
    dataNascimento?: string,
    contato: string,
    typeDocumentSelected: string,
    documento: string,
    endereco: {
      cidade: string,
      bairro: string,
      rua: string,
      numero: string
    }
  },
  servicos: string[],
  tipoDeHospedagem: string,
  valorIntegralExcursao: string,
  entradaParcelamento: string,
  valorParcelas: number,
  qtdParcelas: number,
  dataPagamentoParcela: number,
  dependentes: IDependente[]
}
