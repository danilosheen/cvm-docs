import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brCurrency'
})
export class BrCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';

    // Converte string para número, se necessário
    const numberValue = typeof value === 'string'
      ? parseFloat(value.replace(',', '.'))
      : value;

    // Formata com 2 casas decimais e troca ponto por vírgula
    return numberValue
      .toFixed(2)
      .replace('.', ',');
  }
}
