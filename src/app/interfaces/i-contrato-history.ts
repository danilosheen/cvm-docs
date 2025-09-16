export interface IContratoHistory {
  id: string,
  tipoContrato: string,
  nomeCliente: string,
  documento: string,
  endereco: {
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string
  },
  placaVeiculo: string,
  descricaoVeiculo: string,
  dataInicial: string,
  horaInicial: string,
  dataFinal: string,
  horaFinal: string,
  origem: string,
  destino: string,
  detalhesLocacao: {
    tipoContratoLocacao: string,
    valorTotal: number | null,
    kmTotal: number | null,
    valorKmExcedido: number | null,
    kmCortesia: number | null
  },
  porcentagemSinal: number,
  createdAt: string | Date,
  updatedAt: string | Date
}
