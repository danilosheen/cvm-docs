"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaPassageirosHistoryComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialog_1 = require("@angular/material/dialog");
var lista_passageiros_history_service_1 = require("../../core/services/listaPassageirosHistoryService/lista-passageiros-history.service");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var data_formatada_pipe_1 = require("../../pipes/data-formatada.pipe");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var behavior_subject_service_1 = require("../../core/services/behaviorSubjectService/behavior-subject.service");
var ListaPassageirosHistoryComponent = /** @class */ (function () {
    function ListaPassageirosHistoryComponent() {
        var _this = this;
        this.listaPassageirosHistoryService = core_1.inject(lista_passageiros_history_service_1.ListaPassageirosHistoryService);
        this.listaPassageirosBehaviorSubject = core_1.inject(behavior_subject_service_1.BehaviorSubjectService);
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.router = core_1.inject(router_1.Router);
        // orcamentoBehaviorSubject = inject(OrcamentoBehaviorSubjectService)
        this.listasPassageiros = [];
        this.isLoading = false;
        this.widthScreen = window.innerWidth;
        this.isLoading = true;
        this.listaPassageirosHistoryService.getListaPassageirosHistory().subscribe({
            next: function (result) {
                _this.listasPassageiros = result.listasPassageiros;
                _this.isLoading = false;
            },
            error: function (error) {
                console.log(error);
                _this.isLoading = false;
            }
        });
    }
    ListaPassageirosHistoryComponent.prototype.editarListaPassageirosHistory = function (listaPassageiros) {
        this.listaPassageirosBehaviorSubject.setListaPassageiros(listaPassageiros);
        this.router.navigate(['/lista-passageiros']);
    };
    ListaPassageirosHistoryComponent.prototype.openRemoverListaPassageirosHistory = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            data: {
                dialogTitle: 'Remover lista de passageiros do histórico',
                dialogContent: 'Você tem certeza que deseja remover esta lista de passageiros?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.listaPassageirosHistoryService.removeListaPassageirosHistory(id).subscribe({
                    next: function (result) {
                        console.log(result);
                        _this.listasPassageiros = _this.listasPassageiros.filter(function (listaPassageiros) { return listaPassageiros.id !== id; });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    };
    ListaPassageirosHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-passageiros-history',
            imports: [loading_blue_component_1.LoadingBlueComponent, navbar_component_1.NavbarComponent, footer_component_1.FooterComponent, data_formatada_pipe_1.DataFormatadaPipe],
            templateUrl: './lista-passageiros-history.component.html',
            styleUrl: './lista-passageiros-history.component.css'
        })
    ], ListaPassageirosHistoryComponent);
    return ListaPassageirosHistoryComponent;
}());
exports.ListaPassageirosHistoryComponent = ListaPassageirosHistoryComponent;
