"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoHistoryComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var orcamento_history_service_1 = require("../../core/services/orcamentoHistoryService/orcamento-history.service");
var data_formatada_pipe_1 = require("../../pipes/data-formatada.pipe");
var br_currency_pipe_1 = require("../../pipes/br-currency.pipe");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var dialog_1 = require("@angular/material/dialog");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var router_1 = require("@angular/router");
var orcamento_behavior_subject_service_1 = require("../../core/services/orcamentoBehaviorSubjectService/orcamento-behavior-subject.service");
var OrcamentoHistoryComponent = /** @class */ (function () {
    function OrcamentoHistoryComponent() {
        var _this = this;
        this.orcamentoHistoryService = core_1.inject(orcamento_history_service_1.OrcamentoHistoryService);
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.router = core_1.inject(router_1.Router);
        this.orcamentoBehaviorSubject = core_1.inject(orcamento_behavior_subject_service_1.OrcamentoBehaviorSubjectService);
        this.orcamentos = [];
        this.isLoading = false;
        this.widthScreen = window.innerWidth;
        this.isLoading = true;
        this.orcamentoHistoryService.getOrcamentoHistory().subscribe({
            next: function (result) {
                _this.orcamentos = result.orcamentos;
                _this.isLoading = false;
            },
            error: function (error) {
                console.log(error);
                _this.isLoading = false;
            }
        });
    }
    OrcamentoHistoryComponent.prototype.editarOrcamentoHistory = function (orcamento) {
        this.orcamentoBehaviorSubject.setOrcamento(orcamento);
        this.router.navigate(['/orcamento']);
    };
    OrcamentoHistoryComponent.prototype.openRemoverOrcamentoHistory = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            data: {
                dialogTitle: 'Remover orcamento do histórico',
                dialogContent: 'Você tem certeza que deseja remover este orçamento?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.orcamentoHistoryService.removeOrcamentoHistory(id).subscribe({
                    next: function (result) {
                        console.log(result);
                        _this.orcamentos = _this.orcamentos.filter(function (orcamento) { return orcamento.id !== id; });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    };
    OrcamentoHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-orcamento-history',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                data_formatada_pipe_1.DataFormatadaPipe,
                br_currency_pipe_1.BrCurrencyPipe,
                loading_blue_component_1.LoadingBlueComponent
            ],
            templateUrl: './orcamento-history.component.html',
            styleUrl: './orcamento-history.component.css'
        })
    ], OrcamentoHistoryComponent);
    return OrcamentoHistoryComponent;
}());
exports.OrcamentoHistoryComponent = OrcamentoHistoryComponent;
