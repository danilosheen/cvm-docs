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
var ClienteService = /** @class */ (function () {
    function ClienteService() {
    }
    ClienteService.prototype.getAllClients = function () {
        var clientes = JSON.parse(localStorage.getItem("clientes") || '[]');
        return clientes;
    };
    ClienteService.prototype.saveClient = function (cliente, allClientes) {
        console.log(cliente, allClientes);
        var clienteExiste = allClientes.some(function (c) { return c.nome === cliente.nome; });
        if (!clienteExiste) {
            var clientes = JSON.parse(localStorage.getItem("clientes") || '[]');
            clientes.push(cliente);
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
