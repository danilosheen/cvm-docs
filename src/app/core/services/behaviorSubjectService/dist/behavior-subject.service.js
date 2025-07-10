"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BehaviorSubjectService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BehaviorSubjectService = /** @class */ (function () {
    function BehaviorSubjectService() {
        this.orcamentoBehaviorSubject = new rxjs_1.BehaviorSubject(null);
        this.listaPassageirosBehaviorSubject = new rxjs_1.BehaviorSubject(null);
        this.reciboBehaviorSubject = new rxjs_1.BehaviorSubject(null);
        this.fichaExcursaoBehaviorSubject = new rxjs_1.BehaviorSubject(null);
        this.orcamentoSelecionado$ = this.orcamentoBehaviorSubject.asObservable();
        this.listaPassageirosSelecionado$ = this.listaPassageirosBehaviorSubject.asObservable();
        this.reciboSelecionado$ = this.reciboBehaviorSubject.asObservable();
        this.fichaExcursaoSelecionado$ = this.fichaExcursaoBehaviorSubject.asObservable();
    }
    BehaviorSubjectService.prototype.setOrcamento = function (orcamento) {
        this.orcamentoBehaviorSubject.next(orcamento);
    };
    BehaviorSubjectService.prototype.clearOrcamento = function () {
        this.orcamentoBehaviorSubject.next(null);
    };
    BehaviorSubjectService.prototype.setListaPassageiros = function (listaPassageiros) {
        this.listaPassageirosBehaviorSubject.next(listaPassageiros);
    };
    BehaviorSubjectService.prototype.clearListaPassageiros = function () {
        this.listaPassageirosBehaviorSubject.next(null);
    };
    BehaviorSubjectService.prototype.setRecibo = function (item) {
        this.reciboBehaviorSubject.next(item);
    };
    BehaviorSubjectService.prototype.clearRecibo = function () {
        this.reciboBehaviorSubject.next(null);
    };
    BehaviorSubjectService.prototype.setFichaExcursao = function (item) {
        this.fichaExcursaoBehaviorSubject.next(item);
    };
    BehaviorSubjectService.prototype.clearFichaExcursao = function () {
        this.fichaExcursaoBehaviorSubject.next(null);
    };
    BehaviorSubjectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BehaviorSubjectService);
    return BehaviorSubjectService;
}());
exports.BehaviorSubjectService = BehaviorSubjectService;
