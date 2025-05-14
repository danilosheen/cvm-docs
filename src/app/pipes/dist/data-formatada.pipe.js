"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataFormatadaPipe = void 0;
var core_1 = require("@angular/core");
var DataFormatadaPipe = /** @class */ (function () {
    function DataFormatadaPipe() {
    }
    DataFormatadaPipe.prototype.transform = function (value) {
        if (value) {
            var dataIso = void 0;
            if (value instanceof Date) {
                // Se já for Date, pegar a parte ISO
                dataIso = value.toISOString();
            }
            else {
                dataIso = value;
            }
            // Extrair 'yyyy-MM-dd'
            var _a = dataIso.substring(0, 10).split('-'), ano = _a[0], mes = _a[1], dia = _a[2];
            return dia + "/" + mes + "/" + ano;
        }
        return '';
    };
    DataFormatadaPipe = __decorate([
        core_1.Pipe({
            name: 'dataFormatada'
        })
    ], DataFormatadaPipe);
    return DataFormatadaPipe;
}());
exports.DataFormatadaPipe = DataFormatadaPipe;
