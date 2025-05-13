"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaldoAnteriorService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var http_1 = require("@angular/common/http");
var SaldoAnteriorService = /** @class */ (function () {
    function SaldoAnteriorService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl + "/saldo-anterior";
    }
    SaldoAnteriorService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    SaldoAnteriorService.prototype.adicionarSaldoAnterior = function (dataSaldoAnterior) {
        return this.http.post(this.apiUrl, dataSaldoAnterior, { headers: this.getHeaders() });
    };
    SaldoAnteriorService.prototype.buscarSaldoAnterior = function (mes, ano) {
        var params = { mes: mes.toString().padStart(2, "0"), ano: ano.toString() };
        return this.http.get(this.apiUrl, { params: params, headers: this.getHeaders() });
    };
    SaldoAnteriorService.prototype.atualizarSaldoAnterior = function (id, dataSaldoAnteior) {
        return this.http.put(this.apiUrl + "/" + id, dataSaldoAnteior, { headers: this.getHeaders() });
    };
    SaldoAnteriorService.prototype.removerSaldoAnterior = function (id) {
        return this.http["delete"](this.apiUrl + "/" + id, { headers: this.getHeaders() });
    };
    SaldoAnteriorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SaldoAnteriorService);
    return SaldoAnteriorService;
}());
exports.SaldoAnteriorService = SaldoAnteriorService;
