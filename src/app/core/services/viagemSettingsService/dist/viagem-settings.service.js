"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViagemSettingsService = void 0;
var core_1 = require("@angular/core");
var ViagemSettingsService = /** @class */ (function () {
    function ViagemSettingsService() {
        this.storageKey = 'viagemSettings';
        this.defaultSettings = {
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
            motoristaOptionSelected: 'Não'
        };
    }
    // Salvar no localStorage
    ViagemSettingsService.prototype.save = function (settings) {
        var data = JSON.stringify(settings);
        localStorage.setItem(this.storageKey, data);
    };
    // Recuperar do localStorage
    ViagemSettingsService.prototype.load = function () {
        var data = localStorage.getItem(this.storageKey);
        if (data) {
            try {
                return JSON.parse(data);
            }
            catch (error) {
                console.error('Erro ao ler ViagemSettings do localStorage:', error);
            }
        }
        // Retorna os valores padrão se não houver nada salvo
        return this.defaultSettings;
    };
    // Resetar para valores padrão
    ViagemSettingsService.prototype.reset = function () {
        this.save(this.defaultSettings);
    };
    ViagemSettingsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ViagemSettingsService);
    return ViagemSettingsService;
}());
exports.ViagemSettingsService = ViagemSettingsService;
