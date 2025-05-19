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
var nota_agradecimento_service_1 = require("../../core/services/notaAgradecimentoService/nota-agradecimento.service");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var input_autocomplete_data_pessoa_component_1 = require("../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component");
var email_service_service_1 = require("../../core/services/emailService/email-service.service");
var snack_bar_1 = require("@angular/material/snack-bar");
var NotaAgradecimentoComponent = /** @class */ (function () {
    function NotaAgradecimentoComponent() {
        this.loading = false;
        this.loadingEmail = false;
        this.isLoadingClientes = true;
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.emailService = core_1.inject(email_service_service_1.EmailService);
        this.snackBar = core_1.inject(snack_bar_1.MatSnackBar);
        this.valid = [false];
        this.notaAgradecimentoService = core_1.inject(nota_agradecimento_service_1.NotaAgradecimentoService);
        this.clientes = [];
        this.nomeClientes = [];
        this.nomeCliente = '';
        this.idCliente = '';
        this.emailCliente = '';
    }
    NotaAgradecimentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (clientes) {
            _this.clientes = clientes;
            for (var _i = 0, _a = _this.clientes; _i < _a.length; _i++) {
                var cliente = _a[_i];
                _this.nomeClientes.push({ id: cliente.id, nome: cliente.nome });
            }
            _this.isLoadingClientes = false;
        });
    };
    NotaAgradecimentoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        var nomeClienteFormated = this.formatNomeCliente();
        var date = new Date();
        var pdfName = "Nota de Agradecimento CVM - " + nomeClienteFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
        this.notaAgradecimentoService.generatePDF({ nomeCliente: this.nomeCliente, pdfName: pdfName })
            .subscribe(function (pdfBlob) {
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            link.href = pdfUrl;
            link.download = pdfName;
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
        var _this = this;
        this.loadingEmail = true;
        var data = {
            nomeCliente: this.nomeCliente,
            destinatario: this.emailCliente,
            assunto: "Nota de agradecimento"
        };
        this.emailService.enviarEmailNotaAgradecimento(data).subscribe({
            next: function (response) {
                _this.loadingEmail = false;
                if (response === null || response === void 0 ? void 0 : response.message) {
                    _this.snackBar.open(response.message, 'Ok', {
                        duration: 5000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        data: {}
                    });
                }
            },
            error: function (error) {
                _this.loadingEmail = false;
                _this.snackBar.open('Erro ao enviar o e-mail.', 'Ok', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                });
                console.error(error);
            }
        });
    };
    NotaAgradecimentoComponent.prototype.hasEmail = function () {
        if (this.emailCliente && this.isValid()) {
            return true;
        }
        return false;
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
        var _this = this;
        var _a;
        var pessoa = (value === null || value === void 0 ? void 0 : value.value) || value;
        this.nomeCliente = pessoa.nome;
        if (pessoa.id) {
            this.clientes.forEach(function (cliente) {
                if (cliente.id == pessoa.id) {
                    _this.nomeCliente = cliente.nome;
                    _this.emailCliente = cliente.email || "";
                }
            });
        }
        else {
            this.emailCliente = '';
        }
        this.valid[0] = (_a = value.valid) !== null && _a !== void 0 ? _a : true;
    };
    NotaAgradecimentoComponent = __decorate([
        core_1.Component({
            selector: 'app-nota-agradecimento',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                loading_blue_component_1.LoadingBlueComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                input_autocomplete_data_pessoa_component_1.InputAutocompleteDataPessoaComponent
            ],
            templateUrl: './nota-agradecimento.component.html',
            styleUrl: './nota-agradecimento.component.css'
        })
    ], NotaAgradecimentoComponent);
    return NotaAgradecimentoComponent;
}());
exports.NotaAgradecimentoComponent = NotaAgradecimentoComponent;
