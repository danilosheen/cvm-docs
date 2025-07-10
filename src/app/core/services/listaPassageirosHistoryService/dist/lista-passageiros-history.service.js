"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaPassageirosHistoryService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var http_1 = require("@angular/common/http");
var ListaPassageirosHistoryService = /** @class */ (function () {
    function ListaPassageirosHistoryService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl + "/lista-passageiros-history";
    }
    ListaPassageirosHistoryService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    ListaPassageirosHistoryService.prototype.getListaPassageirosHistory = function () {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    };
    ListaPassageirosHistoryService.prototype.createListaPassageirosHistory = function (data) {
        return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
    };
    ListaPassageirosHistoryService.prototype.removeListaPassageirosHistory = function (id) {
        return this.http["delete"](this.apiUrl + "/" + id, { headers: this.getHeaders() });
    };
    ListaPassageirosHistoryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ListaPassageirosHistoryService);
    return ListaPassageirosHistoryService;
}());
exports.ListaPassageirosHistoryService = ListaPassageirosHistoryService;
