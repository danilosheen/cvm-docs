export interface ICliente {
  id?: string,
  nome: string,
  dataNascimento?: string,
  contato: string,
  typeDocumentSelected: string,
  documento: string,
  cidade: string,
  bairro: string,
  rua: string,
  numero: string,
  updatedAt?: string
}
