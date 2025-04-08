"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaPassageirosService = void 0;
var core_1 = require("@angular/core");
var ListaPassageirosService = /** @class */ (function () {
    function ListaPassageirosService(http) {
        this.http = http;
        //  private apiUrl = 'http://localhost:3000/api/pdf/lista-passageiros';
        this.apiUrl = 'https://backend-cvm.vercel.app/api/lista-passageiros';
    }
    ListaPassageirosService.prototype.generatePDF = function (data) {
        return this.http.post(this.apiUrl, data, { responseType: 'blob' });
    };
    ListaPassageirosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ListaPassageirosService);
    return ListaPassageirosService;
}());
exports.ListaPassageirosService = ListaPassageirosService;
