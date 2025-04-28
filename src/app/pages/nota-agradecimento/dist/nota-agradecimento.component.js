"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotaAgradecimentoComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var cliente_service_1 = require("../../core/services/clienteService/cliente.service");
var input_autocomplete_component_1 = require("../../shared/components/input-autocomplete/input-autocomplete.component");
var nota_agradecimento_service_1 = require("../../core/services/notaAgradecimentoService/nota-agradecimento.service");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var NotaAgradecimentoComponent = /** @class */ (function () {
    function NotaAgradecimentoComponent() {
        this.loading = false;
        this.isLoadingClientes = true;
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.nomeCliente = '';
        this.nomeClientes = [];
        this.valid = [false];
        this.notaAgradecimentoService = core_1.inject(nota_agradecimento_service_1.NotaAgradecimentoService);
    }
    NotaAgradecimentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (clientes) {
            for (var _i = 0, clientes_1 = clientes; _i < clientes_1.length; _i++) {
                var cliente = clientes_1[_i];
                _this.nomeClientes.push(cliente.nome);
            }
            _this.isLoadingClientes = false;
        });
    };
    NotaAgradecimentoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.notaAgradecimentoService.generatePDF(this.nomeCliente)
            .subscribe(function (pdfBlob) {
            var nomeClienteFormated = _this.formatNomeCliente();
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Nota de Agradecimento CVM - " + nomeClienteFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
            link.click();
            _this.loading = false;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }, function (error) {
            try {
                setTimeout(function () {
                    _this.onSubmit();
                }, 1000);
            }
            catch (_a) {
                console.error('Erro ao gerar o PDF:', error);
                _this.loading = false;
            }
        });
    };
    NotaAgradecimentoComponent.prototype.enviarPorEmail = function () {
        this.loading = true;
    };
    NotaAgradecimentoComponent.prototype.formatNomeCliente = function () {
        try {
            var nome = "" + this.nomeCliente.split(" ")[0];
            var index = this.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
            var sobrenome = "" + this.nomeCliente.split(" ")[index];
            var nomeClienteFormated = nome + " " + sobrenome;
            return nomeClienteFormated;
        }
        catch (error) {
            return "" + this.nomeCliente.split(" ")[0];
        }
    };
    NotaAgradecimentoComponent.prototype.isValid = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item == false) {
                return false;
            }
        }
        return true;
    };
    NotaAgradecimentoComponent.prototype.updateNomeClienteHandler = function (value) {
        this.nomeCliente = value.value;
        this.valid[0] = value.valid;
    };
    NotaAgradecimentoComponent = __decorate([
        core_1.Component({
            selector: 'app-nota-agradecimento',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                loading_blue_component_1.LoadingBlueComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                common_1.NgIf,
                button_1.MatButtonModule
            ],
            templateUrl: './nota-agradecimento.component.html',
            styleUrl: './nota-agradecimento.component.css'
        })
    ], NotaAgradecimentoComponent);
    return NotaAgradecimentoComponent;
}());
exports.NotaAgradecimentoComponent = NotaAgradecimentoComponent;
