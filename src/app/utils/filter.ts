import { IContratoHistory } from "../interfaces/i-contrato-history";
import { IListaPassageirosHistory } from "../interfaces/i-listaPassageirosHistory";
import { IOrcamentoHistory } from "../interfaces/i-orcamentoHistory";

export function filtrarLista(
  list: IListaPassageirosHistory[] | IOrcamentoHistory[] | IContratoHistory[],
  searchTerm: string
): any[] {

  if (!Array.isArray(list)) return [];

  if (!searchTerm || !searchTerm.trim()) {
    return list;
  }

  const term = searchTerm.toLowerCase().trim();

  return list.filter(item => {
    if (!item) return false;

    const campoPesquisa = 'nomeCliente' in item
      ? item.nomeCliente
      : 'destino' in item
        ? item.destino
        : '';

    const texto = String(campoPesquisa ?? '')
      .toLowerCase()
      .trim();

    return texto.startsWith(term);
  });
}
