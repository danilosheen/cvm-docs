import { Injectable } from '@angular/core';
import { ViagemSettings } from '../../../interfaces/i-viagemSettings';

@Injectable({
  providedIn: 'root'
})
export class ViagemSettingsService {

  private storageKey = 'viagemSettings';

  private defaultSettings: ViagemSettings = {
    precoCombustivel: 0,
    distanciaKM: 0,
    autonomiaVeiculo: 0,
    combustivelNecessario: 0,
    custoTotalCombustivel: 0,
    desgasteDoVeiculo: 30,
    valorDesgasteDoVeiculo: 0,
    valoresHospedagem: [],
    valoresRefeicao: [],
    valoresPedagio: [],
    valorDiariaMotorista: 0,
    valorPorKm: 0,
    somatorioHospedagens: 0,
    somatorioRefeicoes: 0,
    somatorioPedagios: 0,
    somatorioDiariasMotorista: 0,
    diasDeViagem: 0,
    contadorHospedagens: 0,
    contadorRefeicoes: 0,
    quantidadePedagios: 0,
    margemDeLucro: 75,
    valorMargemDeLucro: 0,
    custoTotalDespesa: 0,
    custoTotalViagem: 0,
    optionsRadio: ['Sim', 'Não'],
    hospedagemOptionSelected: 'Não',
    refeicaoOptionSelected: 'Não',
    pedagioOptionSelected: 'Não',
    motoristaOptionSelected: 'Não',
  };

  // Salvar no localStorage
  save(settings: ViagemSettings): void {
    const data = JSON.stringify(settings);
    localStorage.setItem(this.storageKey, data);
  }

  // Recuperar do localStorage
  load(): ViagemSettings {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        return JSON.parse(data) as ViagemSettings;
      } catch (error) {
        console.error('Erro ao ler ViagemSettings do localStorage:', error);
      }
    }
    // Retorna os valores padrão se não houver nada salvo
    return this.defaultSettings;
  }

  // Resetar para valores padrão
  reset(): void {
    this.save(this.defaultSettings);
  }
}
