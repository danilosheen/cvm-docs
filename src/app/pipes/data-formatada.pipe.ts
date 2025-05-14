import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatada'
})
export class DataFormatadaPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (value) {
      let dataIso: string;

      if (value instanceof Date) {
        // Se já for Date, pegar a parte ISO
        dataIso = value.toISOString();
      } else {
        dataIso = value;
      }

      // Extrair 'yyyy-MM-dd'
      const [ano, mes, dia] = dataIso.substring(0, 10).split('-');
      return `${dia}/${mes}/${ano}`;
    }
    return '';
  }
}
