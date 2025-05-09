"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FluxoCaixaService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var FluxoCaixaService = /** @class */ (function () {
    // private apiUrl = 'http://localhost:3000/api/fluxo-caixa';
    // private apiUrl = 'https://backend-cvm.vercel.app/api';
    function FluxoCaixaService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl + "/fluxo-caixa";
    }
    FluxoCaixaService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    FluxoCaixaService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + "/fluxos", { headers: this.getHeaders() });
    };
    FluxoCaixaService.prototype.getByMonthYear = function (mes, ano) {
        var params = { mes: mes.toString().padStart(2, "0"), ano: ano.toString() };
        return this.http.get(this.apiUrl + "/fluxos-mes", {
            params: params,
            headers: this.getHeaders()
        });
    };
    FluxoCaixaService.prototype.getByIntervalData = function (dataInicial, dataFinal) {
        var params = { dataInicio: dataInicial, dataFim: dataFinal };
        return this.http.get(this.apiUrl + "/fluxos-interval", {
            params: params,
            headers: this.getHeaders()
        });
    };
    FluxoCaixaService.prototype.create = function (data) {
        return this.http.post(this.apiUrl + "/fluxo", data, { headers: this.getHeaders() });
    };
    FluxoCaixaService.prototype.update = function (id, data) {
        return this.http.put(this.apiUrl + "/fluxo/" + id, data, { headers: this.getHeaders() });
    };
    FluxoCaixaService.prototype["delete"] = function (id) {
        return this.http["delete"](this.apiUrl + "/fluxo/" + id, { headers: this.getHeaders() });
    };
    FluxoCaixaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FluxoCaixaService);
    return FluxoCaixaService;
}());
exports.FluxoCaixaService = FluxoCaixaService;
