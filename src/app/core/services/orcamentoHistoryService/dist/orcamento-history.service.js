"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoHistoryService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var http_1 = require("@angular/common/http");
var OrcamentoHistoryService = /** @class */ (function () {
    function OrcamentoHistoryService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl + "/orcamento-history";
    }
    OrcamentoHistoryService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    OrcamentoHistoryService.prototype.getOrcamentoHistory = function () {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    };
    OrcamentoHistoryService.prototype.removeOrcamentoHistory = function (id) {
        return this.http["delete"](this.apiUrl + "/" + id, { headers: this.getHeaders() });
    };
    OrcamentoHistoryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrcamentoHistoryService);
    return OrcamentoHistoryService;
}());
exports.OrcamentoHistoryService = OrcamentoHistoryService;
