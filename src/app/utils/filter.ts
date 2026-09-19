export function filtrarLista(list: any[], searchTerm: string): any[] {
  // 1. Validação do array de entrada
  if (!Array.isArray(list)) return [];

  // 2. Se o termo estiver vazio ou só tiver espaços, retorna a lista completa
  if (!searchTerm || !searchTerm.trim()) {
    return list;
  }

  // Tratamento do termo pesquisado: remove espaços das pontas e passa para minúsculas
  const term = searchTerm.toLowerCase().trim();

  return list.filter(item => {
    // Garante que o item existe
    if (!item) return false;

    // Acessa o nomeCliente com fallback seguro para string vazia
    const nome = String(item.nomeCliente ?? '').toLowerCase().trim();

    // Retorna verdadeiro se o nome COMEÇAR com o termo digitado
    return nome.startsWith(term);
  });
}
