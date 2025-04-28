"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ControleContasComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../../shared/components/footer/footer.component");
var fluxo_caixa_service_1 = require("../../../core/services/fluxoCaixaService/fluxo-caixa.service");
var data_formatada_pipe_1 = require("../../../pipes/data-formatada.pipe");
var common_1 = require("@angular/common");
var dialog_1 = require("@angular/material/dialog");
var dialog_fluxo_component_1 = require("../../../shared/components/dialog-fluxo/dialog-fluxo.component");
var button_1 = require("@angular/material/button");
var br_currency_pipe_1 = require("../../../pipes/br-currency.pipe");
var dialog_generic_component_1 = require("../../../shared/components/dialog-generic/dialog-generic.component");
var ControleContasComponent = /** @class */ (function () {
    function ControleContasComponent() {
        var _this = this;
        this.fluxoService = core_1.inject(fluxo_caixa_service_1.FluxoCaixaService);
        this.fluxos = [];
        this.saldoAnterior = 0;
        this.entradas = [];
        this.saidas = [];
        this.saldoRestante = 0;
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.fluxoService.getAll().subscribe(function (fluxos) {
            _this.fluxos = fluxos;
        });
    }
    ControleContasComponent.prototype.openAdicionarFluxo = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_fluxo_component_1.DialogFluxoComponent, {
            data: {
                title: 'adicionar',
                confirmButton: 'Salvar'
            }
        });
        dialogRef.afterClosed().subscribe(function (fluxo) {
            if (fluxo) {
                _this.fluxoService.create(fluxo).subscribe(function (response) {
                    _this.fluxos = __spreadArrays([response], _this.fluxos);
                });
            }
        });
    };
    ControleContasComponent.prototype.openEditarMovimentacao = function (fluxo) {
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
                _this.fluxoService.update(fluxo.id, fluxo).subscribe(function (response) {
                    console.log(response);
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
                });
            }
        });
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
                br_currency_pipe_1.BrCurrencyPipe
            ],
            templateUrl: './controle-contas.component.html',
            styleUrl: './controle-contas.component.css'
        })
    ], ControleContasComponent);
    return ControleContasComponent;
}());
exports.ControleContasComponent = ControleContasComponent;
