"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DependenteService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var DependenteService = /** @class */ (function () {
    // private apiUrl = 'https://backend-cvm.vercel.app/api';
    function DependenteService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = 'http://localhost:3000/api';
    }
    DependenteService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    DependenteService.prototype.getAll = function (idCliente) {
        return this.http.get(this.apiUrl + "/dependentes/" + idCliente, { headers: this.getHeaders() });
    };
    DependenteService.prototype.create = function (data) {
        return this.http.post(this.apiUrl + "/dependente", data, { headers: this.getHeaders() });
    };
    DependenteService.prototype.update = function (id, data) {
        return this.http.put(this.apiUrl + "/dependente/" + id, data, { headers: this.getHeaders() });
    };
    DependenteService.prototype["delete"] = function (id) {
        return this.http["delete"](this.apiUrl + "/dependente/" + id, { headers: this.getHeaders() });
    };
    DependenteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DependenteService);
    return DependenteService;
}());
exports.DependenteService = DependenteService;
