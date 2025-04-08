"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaPassageirosComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_autocomplete_component_1 = require("../../shared/components/input-autocomplete/input-autocomplete.component");
var cliente_service_1 = require("../../core/services/clienteService/cliente.service");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var ListaPassageirosComponent = /** @class */ (function () {
    function ListaPassageirosComponent(pdfListaPassageiros) {
        var _this = this;
        this.pdfListaPassageiros = pdfListaPassageiros;
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.clientes = this.clienteService.getAllClients();
        this.arrayNomeClientes = [];
        this.listaPassageiros = [];
        this.passageiro = {
            nome: '',
            documento: ''
        };
        this.valid = [];
        this.loading = false;
        this.clientes.forEach(function (element) {
            _this.arrayNomeClientes.push(element.nome);
        });
        for (var i = 0; i < 2; i++) {
            this.valid.push(false);
        }
    }
    ListaPassageirosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.pdfListaPassageiros.generatePDF(this.listaPassageiros)
            .subscribe(function (pdfBlob) {
            var nomeDestinoFormated = _this.formatNomeDestino();
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Or\u00E7. CVM - " + nomeDestinoFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
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
    ListaPassageirosComponent.prototype.openDialog = function (enterAnimationDuration, exitAnimationDuration, i) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            width: '250px',
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.listaPassageiros.splice(i, 1);
            }
        });
    };
    ListaPassageirosComponent.prototype.adicionarPassageiro = function () {
        this.listaPassageiros.push(this.passageiro);
        this.passageiro = { nome: '', documento: '' };
        this.resetArrayValid();
    };
    ListaPassageirosComponent.prototype.camposValidos = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    ListaPassageirosComponent.prototype.resetArrayValid = function () {
        for (var i = 0; i < this.valid.length; i++) {
            this.valid[i] = false;
        }
    };
    ListaPassageirosComponent.prototype.formatNomeDestino = function () {
        // try {
        //   const nome = `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
        //   const index = this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "de" || this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
        //   const sobrenome = `${this.fichaExcursaoData.cliente.nome.split(" ")[index]}`;
        //   const nomeClienteFormated = `${nome} ${sobrenome}`;
        //   return nomeClienteFormated
        // } catch (error) {
        //   return `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
        // }
    };
    ListaPassageirosComponent.prototype.updateNomeHandler = function (value) {
        var _this = this;
        this.passageiro.nome = value.value;
        this.valid[0] = value.valid;
        this.clientes.forEach(function (element) {
            if (_this.passageiro.nome == element.nome && (element.documento && element.documento != 'Não informado')) {
                _this.updateDocumentoHandler({ value: element.documento, valid: true });
            }
        });
    };
    ListaPassageirosComponent.prototype.updateDocumentoHandler = function (value) {
        this.passageiro.documento = value.value;
        this.valid[1] = value.valid;
    };
    ListaPassageirosComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-passageiros',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                input_number_component_1.InputNumberComponent,
                button_1.MatButtonModule,
                common_1.NgIf,
                common_1.NgFor
            ],
            templateUrl: './lista-passageiros.component.html',
            styleUrl: './lista-passageiros.component.css'
        })
    ], ListaPassageirosComponent);
    return ListaPassageirosComponent;
}());
exports.ListaPassageirosComponent = ListaPassageirosComponent;
