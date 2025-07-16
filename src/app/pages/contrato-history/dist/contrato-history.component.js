"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContratoHistoryComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialog_1 = require("@angular/material/dialog");
var behavior_subject_service_1 = require("../../core/services/behaviorSubjectService/behavior-subject.service");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var contrato_history_service_1 = require("../../core/services/contratoHistoryService/contrato-history.service");
var br_currency_pipe_1 = require("../../pipes/br-currency.pipe");
var data_formatada_pipe_1 = require("../../pipes/data-formatada.pipe");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var ContratoHistoryComponent = /** @class */ (function () {
    function ContratoHistoryComponent() {
        var _this = this;
        this.contratoHistoryService = core_1.inject(contrato_history_service_1.ContratoHistoryService);
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.router = core_1.inject(router_1.Router);
        this.contratoBehaviorSubject = core_1.inject(behavior_subject_service_1.BehaviorSubjectService);
        this.contratos = [];
        this.isLoading = false;
        this.widthScreen = window.innerWidth;
        this.isLoading = true;
        this.contratoHistoryService.getContratoHistory().subscribe({
            next: function (result) {
                _this.contratos = result.contratos;
                _this.isLoading = false;
            },
            error: function (error) {
                console.log(error);
                _this.isLoading = false;
            }
        });
    }
    ContratoHistoryComponent.prototype.editarOrcamentoHistory = function (contrato) {
        this.contratoBehaviorSubject.setContrato(contrato);
        this.router.navigate(['/contrato']);
    };
    ContratoHistoryComponent.prototype.openRemoverOrcamentoHistory = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            data: {
                dialogTitle: 'Remover contrato do histórico',
                dialogContent: 'Você tem certeza que deseja remover este contrato?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.contratoHistoryService.removeContratoHistory(id).subscribe({
                    next: function (result) {
                        console.log(result);
                        _this.contratos = _this.contratos.filter(function (contrato) { return contrato.id !== id; });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    };
    ContratoHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-contrato-history',
            imports: [br_currency_pipe_1.BrCurrencyPipe, data_formatada_pipe_1.DataFormatadaPipe, footer_component_1.FooterComponent, navbar_component_1.NavbarComponent, loading_blue_component_1.LoadingBlueComponent],
            templateUrl: './contrato-history.component.html',
            styleUrl: './contrato-history.component.css'
        })
    ], ContratoHistoryComponent);
    return ContratoHistoryComponent;
}());
exports.ContratoHistoryComponent = ContratoHistoryComponent;
