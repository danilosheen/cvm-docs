"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoBehaviorSubjectService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var OrcamentoBehaviorSubjectService = /** @class */ (function () {
    function OrcamentoBehaviorSubjectService() {
        this.orcamentoSubject = new rxjs_1.BehaviorSubject(null);
        this.orcamentoSelecionado$ = this.orcamentoSubject.asObservable();
    }
    OrcamentoBehaviorSubjectService.prototype.setOrcamento = function (orcamento) {
        this.orcamentoSubject.next(orcamento);
    };
    OrcamentoBehaviorSubjectService.prototype.clearOrcamento = function () {
        this.orcamentoSubject.next(null);
    };
    OrcamentoBehaviorSubjectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrcamentoBehaviorSubjectService);
    return OrcamentoBehaviorSubjectService;
}());
exports.OrcamentoBehaviorSubjectService = OrcamentoBehaviorSubjectService;
