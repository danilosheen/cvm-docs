"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ClienteService = /** @class */ (function () {
    // private apiUrl = 'https://backend-cvm.vercel.app/api';
    function ClienteService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = 'http://localhost:3000/api';
    }
    ClienteService.prototype.getHeaders = function () {
        var token = this.authService.getToken();
        return new http_1.HttpHeaders({
            'Authorization': "Bearer " + token
        });
    };
    ClienteService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + "/clientes", { headers: this.getHeaders() });
    };
    ClienteService.prototype.create = function (data) {
        return this.http.post(this.apiUrl + "/cliente", data, { headers: this.getHeaders() });
    };
    ClienteService.prototype.update = function (id, data) {
        return this.http.put(this.apiUrl + "/cliente/" + id, data, { headers: this.getHeaders() });
    };
    ClienteService.prototype["delete"] = function (id) {
        return this.http["delete"](this.apiUrl + "/cliente/" + id, { headers: this.getHeaders() });
    };
    // LocalStorage
    ClienteService.prototype.getAllClients = function () {
        var clientes = JSON.parse(localStorage.getItem("clientes") || '[]');
        return clientes;
    };
    ClienteService.prototype.saveClient = function (cliente, allClientes) {
        var clienteExiste = allClientes.some(function (c) { return c.nome === cliente.nome; });
        if (!clienteExiste) {
            var clientes = JSON.parse(localStorage.getItem("clientes") || '[]');
            clientes.push(cliente);
            // Ordena por nome em ordem alfabética (case-insensitive)
            clientes.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }); });
            localStorage.setItem("clientes", JSON.stringify(clientes));
            return clientes;
        }
        return clienteExiste;
    };
    ClienteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
