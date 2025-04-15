import { IDependente } from "./i-dependente"

export interface IFichaExcursao {
  excursaoPara: string,
  localSaida: string,
  dataSaida: string,
  horaSaida: string,
  dataRetorno: string,
  horaRetorno: string,
  cliente: {
    id: string,
    nome: string,
    dataNascimento: string,
    contato: string,
    cpf: string,
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
  valorParcelas: string,
  qtdParcelas: string,
  dataPagamentoParcela: string,
  dependentes: IDependente[]
}
