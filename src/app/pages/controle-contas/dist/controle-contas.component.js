"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControleContasComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var fluxo_caixa_service_1 = require("../../core/services/fluxoCaixaService/fluxo-caixa.service");
var data_formatada_pipe_1 = require("../../pipes/data-formatada.pipe");
var common_1 = require("@angular/common");
var dialog_1 = require("@angular/material/dialog");
var dialog_fluxo_component_1 = require("../../shared/components/dialog-fluxo/dialog-fluxo.component");
var button_1 = require("@angular/material/button");
var br_currency_pipe_1 = require("../../pipes/br-currency.pipe");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var input_month_year_component_1 = require("../../shared/components/input-month-year/input-month-year.component");
var dialog_saldo_component_1 = require("../../shared/components/dialog-saldo/dialog-saldo.component");
var saldo_anterior_service_1 = require("../../core/services/saldoAnteriorService/saldo-anterior.service");
var gerar_relatorio_service_1 = require("../../core/services/gerarRelatorioService/gerar-relatorio.service");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var ControleContasComponent = /** @class */ (function () {
    function ControleContasComponent() {
        this.fluxoService = core_1.inject(fluxo_caixa_service_1.FluxoCaixaService);
        this.relatorioService = core_1.inject(gerar_relatorio_service_1.GerarRelatorioService);
        this.fluxos = [];
        this.entradas = [];
        this.saidas = [];
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.saldoAnteriorService = core_1.inject(saldo_anterior_service_1.SaldoAnteriorService);
        this.data = new Date();
        this.mesAtual = this.data.getMonth() + 1;
        this.anoAtual = this.data.getFullYear();
        this.mesAnoAtual = this.mesAtual + "/" + this.anoAtual;
        this._mesAnoSelected = { mes: this.mesAtual, ano: this.anoAtual };
        this.loadingPdf = false;
        this.isLoading = false;
        this.saldoAnterior = 0;
        this.somaEntradas = 0;
        this.somaSaidas = 0;
        this.saldoRestante = 0;
        this.carregarFluxos();
        this.carregarSaldoAnterior();
    }
    Object.defineProperty(ControleContasComponent.prototype, "mesAnoSelected", {
        get: function () {
            return this._mesAnoSelected;
        },
        set: function (value) {
            this._mesAnoSelected = value;
            this.carregarFluxos();
            this.carregarSaldoAnterior();
        },
        enumerable: false,
        configurable: true
    });
    ControleContasComponent.prototype.resetarValores = function () {
        this.fluxos = [];
        this.saldoAnterior = 0;
        this.somaEntradas = 0;
        this.somaSaidas = 0;
        this.saldoRestante = 0;
    };
    ControleContasComponent.prototype.carregarFluxos = function () {
        var _this = this;
        this.isLoading = true;
        this.resetarValores();
        var mes = this.mesAnoSelected.mes;
        var ano = this.mesAnoSelected.ano;
        this.fluxoService.getByMonthYear(this.mesAnoSelected.mes, this.mesAnoSelected.ano).subscribe({
            next: function (fluxos) {
                _this.fluxos = fluxos;
                _this.atualizarSaldo();
                _this.mesAnoAtual = mes + "/" + ano;
                _this.isLoading = false;
            },
            error: function (error) {
                console.error('Erro ao carregar fluxos:', error);
                _this.isLoading = false;
            }
        });
    };
    ControleContasComponent.prototype.carregarSaldoAnterior = function () {
        var _this = this;
        this.saldoAnteriorService.buscarSaldoAnterior(this.mesAnoSelected.mes, this.mesAnoSelected.ano)
            .subscribe({
            next: function (response) {
                _this.saldoAnterior = response.saldoAnterior;
            },
            error: function (error) {
                console.log(error);
                _this.saldoAnterior = 0;
            }
        });
    };
    ControleContasComponent.prototype.gerarRelatorioMensal = function () {
        var _this = this;
        // monta objeto
        var mes = this.mesAnoSelected.mes.toString().padStart(2, "0");
        var ano = this.mesAnoSelected.ano.toString();
        var pdfName = "Relat\u00F3rio mensal CVM - " + mes + "/" + ano + ".pdf";
        var relatorioData = {
            fluxos: this.fluxos,
            saldoAnterior: this.saldoAnterior,
            entradas: this.somaEntradas,
            saidas: this.somaSaidas,
            saldoRestante: this.saldoRestante,
            mesAno: mes + "/" + ano,
            pdfName: pdfName
        };
        // faz requisição
        this.loadingPdf = true;
        this.relatorioService.gerarRelatorio(relatorioData).subscribe({
            next: function (pdfBlob) {
                var pdfUrl = URL.createObjectURL(pdfBlob);
                var link = document.createElement('a');
                link.href = pdfUrl;
                link.download = pdfName;
                link.click();
                _this.loadingPdf = false;
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    ControleContasComponent.prototype.openAdicionarMovimentacao = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_fluxo_component_1.DialogFluxoComponent, {
            data: {
                title: 'adicionar',
                confirmButton: 'Salvar'
            }
        });
        dialogRef.afterClosed().subscribe(function (fluxo) {
            if (fluxo) {
                console.log(fluxo);
                _this.fluxoService.create(fluxo).subscribe(function (response) {
                    // this.fluxos = [response, ...this.fluxos]
                    console.log(response);
                    _this.carregarFluxos();
                });
            }
        });
    };
    ControleContasComponent.prototype.openEditarMovimentacao = function (fluxo, i) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_fluxo_component_1.DialogFluxoComponent, {
            data: {
                fluxo: fluxo,
                title: 'editar',
                confirmButton: 'Atualizar',
                editFluxo: true
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fluxoService.update(fluxo.id, fluxo).subscribe(function () {
                    _this.atualizarSaldo();
                });
            }
        });
    };
    ControleContasComponent.prototype.openRemoverMovimentacao = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            data: {
                dialogTitle: 'Remover movimentação',
                dialogContent: 'Você tem certeza que deseja remover esta movimentação?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fluxoService["delete"](id).subscribe(function (response) {
                    _this.fluxos = _this.fluxos.filter(function (i) { return i.id != id; });
                    _this.atualizarSaldo();
                });
            }
        });
    };
    ControleContasComponent.prototype.openAdicionarSaldoAnterior = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_saldo_component_1.DialogSaldoComponent, {
            data: {
                dialogTitle: "Atualizar saldo anterior",
                dialogContent: "Insira o valor do saldo anterior",
                saldoAnterior: this.saldoAnterior
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result || result === 0) {
                var valorFormatado_1 = result;
                var mesAtual = _this.mesAnoSelected.mes.toString().padStart(2, "0");
                var anoAtual = _this.mesAnoSelected.ano.toString();
                _this.saldoAnteriorService.adicionarSaldoAnterior({
                    mes: mesAtual, ano: anoAtual, saldoAnterior: valorFormatado_1
                }).subscribe({
                    next: function (response) {
                        _this.saldoAnterior = valorFormatado_1;
                        _this.saldoRestante = _this.saldoAnterior + _this.somaEntradas - _this.somaSaidas;
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    };
    ControleContasComponent.prototype.atualizarEntradas = function () {
        var _this = this;
        this.entradas = [];
        if (this.fluxos.length > 0) {
            this.fluxos.forEach(function (fluxo) {
                if (fluxo.tipo === "ENTRADA") {
                    var valorNumerico = parseFloat(fluxo.valor);
                    _this.entradas.push(valorNumerico);
                }
            });
        }
    };
    ControleContasComponent.prototype.atualizarSaidas = function () {
        var _this = this;
        this.saidas = [];
        if (this.fluxos.length > 0) {
            this.fluxos.forEach(function (fluxo) {
                if (fluxo.tipo === "SAIDA") {
                    var valorNumerico = parseFloat(fluxo.valor);
                    _this.saidas.push(valorNumerico);
                }
            });
        }
    };
    ControleContasComponent.prototype.atualizarSaldo = function () {
        var _this = this;
        this.atualizarEntradas();
        this.atualizarSaidas();
        if (this.fluxos.length > 0) {
            this.somaEntradas = 0;
            this.somaSaidas = 0;
            this.entradas.forEach(function (entrada) { _this.somaEntradas += entrada; });
            this.saidas.forEach(function (saida) { _this.somaSaidas += saida; });
            this.saldoRestante = this.saldoAnterior + this.somaEntradas - this.somaSaidas;
        }
        else {
            this.saldoRestante = this.saldoAnterior;
        }
    };
    ControleContasComponent.prototype.updateMonthYearSelectedHandler = function (value) {
        var dataMoment = value;
        var mes = dataMoment.format("MM");
        var ano = dataMoment.format("YYYY");
        this.mesAnoSelected = { mes: mes, ano: ano };
    };
    ControleContasComponent = __decorate([
        core_1.Component({
            selector: 'app-controle-contas',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                data_formatada_pipe_1.DataFormatadaPipe,
                common_1.NgClass,
                button_1.MatButtonModule,
                br_currency_pipe_1.BrCurrencyPipe,
                input_month_year_component_1.InputMonthYearComponent,
                common_1.NgIf,
                loading_blue_component_1.LoadingBlueComponent
            ],
            templateUrl: './controle-contas.component.html',
            styleUrl: './controle-contas.component.css'
        })
    ], ControleContasComponent);
    return ControleContasComponent;
}());
exports.ControleContasComponent = ControleContasComponent;
