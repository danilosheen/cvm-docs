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


    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numberValue).replace("R$", "").trim();
  }
}

