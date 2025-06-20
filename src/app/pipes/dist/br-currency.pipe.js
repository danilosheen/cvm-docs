"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BrCurrencyPipe = void 0;
var core_1 = require("@angular/core");
var BrCurrencyPipe = /** @class */ (function () {
    function BrCurrencyPipe() {
    }
    BrCurrencyPipe.prototype.transform = function (value) {
        if (value === null || value === undefined)
            return '';
        // Converte string para número, se necessário
        var numberValue = typeof value === 'string'
            ? parseFloat(value.replace(',', '.'))
            : value;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numberValue).replace("R$", "").trim();
    };
    BrCurrencyPipe = __decorate([
        core_1.Pipe({
            name: 'brCurrency'
        })
    ], BrCurrencyPipe);
    return BrCurrencyPipe;
}());
exports.BrCurrencyPipe = BrCurrencyPipe;
