export interface ICliente {
  id?: string,
  nome: string,
  dataNascimento?: string,
  contato: string,
  email?: string,
  typeDocumentSelected: string,
  documento: string,
  cidade?: string,
  bairro?: string,
  rua?: string,
  numero?: number,
  ultimaViagem?: string,
}
