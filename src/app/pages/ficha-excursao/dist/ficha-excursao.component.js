"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FichaExcursaoComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_text_component_1 = require("../../shared/components/input-text/input-text.component");
var input_autocomplete_component_1 = require("../../shared/components/input-autocomplete/input-autocomplete.component");
var input_date_component_1 = require("../../shared/components/input-date/input-date.component");
var input_time_component_1 = require("../../shared/components/input-time/input-time.component");
var common_1 = require("@angular/common");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var button_1 = require("@angular/material/button");
var input_checkbox_component_1 = require("../../shared/components/input-checkbox/input-checkbox.component");
var FichaExcursaoComponent = /** @class */ (function () {
    function FichaExcursaoComponent(pdfFichaExcursao) {
        this.pdfFichaExcursao = pdfFichaExcursao;
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.valid = [];
        this.cidades = ["Juazeiro do Norte", "Crato", "Barbalha"];
        this.fichaExcursaoData = {
            excursaoPara: '',
            localSaida: '',
            dataSaida: '',
            horaSaida: '',
            dataRetorno: '',
            horaRetorno: '',
            cliente: {
                nome: '',
                dataNascimento: '',
                contato: '',
                cpf: '',
                endereco: {
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: ''
                }
            },
            servicos: [],
            tipoDeHospedagem: '',
            valorIntegralExcursao: '',
            entradaParcelamento: '',
            valorParcelas: '',
            qtdParcelas: '',
            dataPagamentoParcela: '',
            dependentes: []
        };
        //inicializando o array de campos válidos
        for (var i = 0; i < 4; i++) {
            this.valid.push(false);
        }
    }
    FichaExcursaoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.pdfFichaExcursao.generatePDF(this.pdfFichaExcursao)
            .subscribe(function (pdfBlob) {
            var nomeClienteFormated = _this.formatNomeCliente();
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Ficha de Excurs\u00E3o CVM - " + nomeClienteFormated + " " + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
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
    FichaExcursaoComponent.prototype.formatNomeCliente = function () {
        try {
            var nome = "" + this.fichaExcursaoData.cliente.nome.split(" ")[0];
            var index = this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "de" || this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
            var sobrenome = "" + this.fichaExcursaoData.cliente.nome.split(" ")[index];
            var nomeClienteFormated = nome + " " + sobrenome;
            return nomeClienteFormated;
        }
        catch (error) {
            return "" + this.fichaExcursaoData.cliente.nome.split(" ")[0];
        }
    };
    FichaExcursaoComponent.prototype.camposValidos = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    FichaExcursaoComponent.prototype.updateExcursaoParaHandler = function (value) {
        this.fichaExcursaoData.excursaoPara = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateLocalSaidaHandler = function (value) {
        this.fichaExcursaoData.localSaida = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataSaidaHandler = function (value) {
        this.fichaExcursaoData.dataSaida = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateHoraSaidaHandler = function (value) {
        this.fichaExcursaoData.horaSaida = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataRetornoHandler = function (value) {
        this.fichaExcursaoData.dataRetorno = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateHoraRetornoHandler = function (value) {
        this.fichaExcursaoData.horaRetorno = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateNomeClienteHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataNascimentoHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateContatoHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateCpfHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateCidadeHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateBairroHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateRuaHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateNumeroCasaHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateValorTotalExcursaoHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateEntradaParcelamentoHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateQtdParcelasHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataVencimentoHandler = function (value) {
        this.fichaExcursaoData.cliente.nome = value.value;
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent = __decorate([
        core_1.Component({
            selector: 'app-ficha-excursao',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                input_text_component_1.InputTextComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent,
                input_number_component_1.InputNumberComponent,
                input_checkbox_component_1.InputCheckboxComponent
            ],
            templateUrl: './ficha-excursao.component.html',
            styleUrl: './ficha-excursao.component.css'
        })
    ], FichaExcursaoComponent);
    return FichaExcursaoComponent;
}());
exports.FichaExcursaoComponent = FichaExcursaoComponent;
