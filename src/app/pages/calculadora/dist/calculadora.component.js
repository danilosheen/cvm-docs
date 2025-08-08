"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalculadoraComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var input_radio_component_1 = require("../../shared/components/input-radio/input-radio.component");
var br_currency_pipe_1 = require("../../pipes/br-currency.pipe");
var CalculadoraComponent = /** @class */ (function () {
    function CalculadoraComponent() {
        this.precoCombustivel = 0;
        this.distanciaKM = 0;
        this.autonomiaVeiculo = 0;
        this.combustivelNecessario = 0;
        this.custoTotalCombustivel = 0;
        this.desgasteDoVeiculo = 30;
        this.valorDesgasteDoVeiculo = 0;
        this.valoresHospedagem = [];
        this.valoresRefeicao = [];
        this.valoresPedagio = [];
        this.valorDiariaMotorista = 0;
        this.somatorioHospedagens = 0;
        this.somatorioRefeicoes = 0;
        this.somatorioPedagios = 0;
        this.somatorioDiariasMotorista = 0;
        this.diasDeViagem = 0;
        this.quantidadePedagios = 0;
        this.margemDeLucro = 50;
        this.valorMargemDeLucro = 0;
        this.custoTotalViagem = 0;
        this.optionsRadio = ['Sim', 'Não'];
        this.hospedagemOptionSelected = 'Não';
        this.refeicaoOptionSelected = 'Não';
        this.pedagioOptionSelected = 'Não';
        this.motoristaOptionSelected = 'Não';
        this.valid = [];
        this.loading = false;
        for (var i = 0; i < 4; i++) {
            this.valid[i] = false;
        }
    }
    CalculadoraComponent.prototype.calcularViagem = function () {
        this.loading = true;
        this.combustivelNecessario = this.calcularCombustivelNecessario(this.distanciaKM || 0, this.autonomiaVeiculo || 0);
        this.custoTotalCombustivel = this.calcularCustoTotalCombustivel(this.combustivelNecessario || 0, this.precoCombustivel || 0);
        this.valorDesgasteDoVeiculo = this.custoTotalCombustivel * (this.desgasteDoVeiculo / 100);
        //percorre o array e retorna o somatório acumulado dos valores
        this.somatorioHospedagens = this.valoresHospedagem.reduce(function (total, hospedagem) { return total + hospedagem; }, 0);
        this.somatorioRefeicoes = this.valoresRefeicao.reduce(function (total, refeicao) { return total + refeicao; }, 0);
        this.somatorioPedagios = this.valoresPedagio.reduce(function (total, pedagio) { return total + pedagio; }, 0);
        this.somatorioDiariasMotorista = this.valorDiariaMotorista * this.diasDeViagem;
        this.custoTotalViagem =
            this.custoTotalCombustivel +
                this.valorDesgasteDoVeiculo +
                this.somatorioHospedagens +
                this.somatorioRefeicoes +
                this.somatorioPedagios +
                this.somatorioDiariasMotorista;
        this.valorMargemDeLucro = this.custoTotalViagem * (this.margemDeLucro / 100);
        this.custoTotalViagem += this.valorMargemDeLucro;
        console.log(this.valorDiariaMotorista);
        console.log(this.custoTotalViagem);
        this.loading = false;
    };
    CalculadoraComponent.prototype.camposPreenchidos = function () {
        // console.log(this.valid)
        return this.valid.every(function (element) { return element === true; });
    };
    CalculadoraComponent.prototype.calcularCombustivelNecessario = function (distanciaKM, autonomiaVeiculo) {
        return (distanciaKM / autonomiaVeiculo);
    };
    CalculadoraComponent.prototype.calcularCustoTotalCombustivel = function (combustivelNecessario, precoCombustivel) {
        return (combustivelNecessario * precoCombustivel);
    };
    CalculadoraComponent.prototype.adicionarValorLista = function (lista, valor, index) {
        lista[index] = valor;
        console.log(lista);
    };
    CalculadoraComponent.prototype.removerValorLista = function (lista, index) {
        lista.splice(index, 1);
    };
    CalculadoraComponent.prototype.updatePrecoCombustivelHandler = function (value) {
        this.precoCombustivel = value.value;
        this.valid[0] = value.valid;
    };
    CalculadoraComponent.prototype.updateDistanciaEmKmHandler = function (value) {
        this.distanciaKM = value.value;
        this.valid[1] = value.valid;
    };
    CalculadoraComponent.prototype.updateAutonomiaDoVeiculoHandler = function (value) {
        this.autonomiaVeiculo = value.value;
        this.valid[2] = value.valid;
    };
    CalculadoraComponent.prototype.updateDesgasteDoVeiculoHandler = function (value) {
        this.desgasteDoVeiculo = value.value;
        this.valid[3] = value.valid;
    };
    CalculadoraComponent.prototype.updateDiasDeViagemHandler = function (value) {
        this.diasDeViagem = value.value;
    };
    CalculadoraComponent.prototype.updateRadioHospedagemSelectedHandler = function (value) {
        this.valoresHospedagem = [];
        this.hospedagemOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateRadioRefeicaoSelectedHandler = function (value) {
        this.valoresRefeicao = [];
        this.refeicaoOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateRadioPedagioSelectedHandler = function (value) {
        this.valoresPedagio = [];
        this.pedagioOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateQuantidadePedagiosHandler = function (value) {
        this.quantidadePedagios = value.value;
    };
    CalculadoraComponent.prototype.updateRadioMotoristaSelectedHandler = function (value) {
        this.motoristaOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateValorDiariaMotoristaHandler = function (value) {
        this.valorDiariaMotorista = value.value;
    };
    CalculadoraComponent.prototype.updateMargemDeLucroHandler = function (value) {
        this.margemDeLucro = value.value;
    };
    CalculadoraComponent = __decorate([
        core_1.Component({
            selector: 'app-calculadora',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                input_number_component_1.InputNumberComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                input_radio_component_1.InputRadioComponent,
                br_currency_pipe_1.BrCurrencyPipe
            ],
            templateUrl: './calculadora.component.html',
            styleUrl: './calculadora.component.css'
        })
    ], CalculadoraComponent);
    return CalculadoraComponent;
}());
exports.CalculadoraComponent = CalculadoraComponent;
