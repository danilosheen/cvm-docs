"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PassageiroService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var PassageiroService = /** @class */ (function () {
    function PassageiroService(http, authService) {
        this.http = http;
        this.authService = authService;
        // private apiUrl = 'http://localhost:3000/api';
        this.apiUrl = 'https://backend-cvm.vercel.app/api';
    }
    PassageiroService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    PassageiroService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + "/passageiros", { headers: this.getHeaders() });
    };
    PassageiroService.prototype.create = function (data) {
        return this.http.post(this.apiUrl + "/passageiro", data, { headers: this.getHeaders() });
    };
    PassageiroService.prototype.update = function (id, data) {
        return this.http.put(this.apiUrl + "/passageiro/" + id, data, { headers: this.getHeaders() });
    };
    PassageiroService.prototype["delete"] = function (id) {
        return this.http["delete"](this.apiUrl + "/passageiro/" + id, { headers: this.getHeaders() });
    };
    PassageiroService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PassageiroService);
    return PassageiroService;
}());
exports.PassageiroService = PassageiroService;
