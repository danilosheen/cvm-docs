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
var input_text_component_1 = require("../../shared/components/input-text/input-text.component");
var input_date_component_1 = require("../../shared/components/input-date/input-date.component");
var input_time_component_1 = require("../../shared/components/input-time/input-time.component");
var input_autocomplete_data_client_component_1 = require("../../shared/components/input-autocomplete-data-client/input-autocomplete-data-client.component");
var ListaPassageirosComponent = /** @class */ (function () {
    function ListaPassageirosComponent(pdfListaPassageiros, authService, router) {
        this.pdfListaPassageiros = pdfListaPassageiros;
        this.authService = authService;
        this.router = router;
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.clientes = [];
        this.arrayNomeClientes = [];
        this.listaPassageiros = {
            numeroCarro: '',
            placa: '',
            motorista: '',
            origem: '',
            destino: '',
            dataSaida: '',
            horaSaida: '',
            dataRetorno: '',
            horaRetorno: '',
            extensaoRoteiroKm: '',
            passageiros: []
        };
        this.passageiro = {
            nome: '',
            documento: ''
        };
        this.valid = [];
        this.loading = false;
        this.motoristas = ["Crairton", "Claudiney"];
        this.cidades = ["Juazeiro do Norte", "Crato", "Barbalha"];
        if (!this.authService.getToken()) {
            this.router.navigate(["/"]);
        }
        for (var i = 0; i <= 10; i++) {
            this.valid.push(false);
        }
    }
    ListaPassageirosComponent.prototype.ngOnInit = function () {
        this.povoaArrayClientes();
    };
    ListaPassageirosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.pdfListaPassageiros.generatePDF(this.listaPassageiros)
            .subscribe(function (pdfBlob) {
            // const nomeDestinoFormated = this.formatNomeDestino();
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Lista de passageiros CVM - " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
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
            exitAnimationDuration: exitAnimationDuration,
            data: {
                dialogTitle: 'Remover passageiro',
                dialogContent: 'Você tem certeza que deseja remover o passageiro?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.listaPassageiros.passageiros.splice(i, 1);
            }
        });
    };
    ListaPassageirosComponent.prototype.povoaArrayClientes = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (element) {
            _this.clientes = element;
            for (var _i = 0, element_1 = element; _i < element_1.length; _i++) {
                var cliente = element_1[_i];
                _this.arrayNomeClientes.push({ nome: cliente.nome, id: cliente.id });
            }
        });
    };
    ListaPassageirosComponent.prototype.adicionarPassageiro = function () {
        this.listaPassageiros.passageiros.push(this.passageiro);
        this.passageiro = { nome: '', documento: '' };
        this.resetArrayValid();
    };
    ListaPassageirosComponent.prototype.camposValidos = function () {
        for (var i = 9; i < this.valid.length; i++) {
            if (this.valid[i] == false) {
                return false;
            }
        }
        return true;
    };
    ListaPassageirosComponent.prototype.camposViagemPreenchidos = function () {
        for (var i = 0; i < 9; i++) {
            if (this.valid[i] == false) {
                return false;
            }
        }
        return true;
    };
    ListaPassageirosComponent.prototype.canGerarPdf = function () {
        if (this.listaPassageiros.passageiros.length && this.camposViagemPreenchidos()) {
            return true;
        }
        return false;
    };
    ListaPassageirosComponent.prototype.resetArrayValid = function () {
        for (var i = 9; i < this.valid.length; i++) {
            this.valid[i] = false;
        }
    };
    ListaPassageirosComponent.prototype.updateNumeroCarroHandler = function (value) {
        this.listaPassageiros.numeroCarro = value.value;
        this.valid[0] = value.valid;
    };
    ListaPassageirosComponent.prototype.updatePlacaHandler = function (value) {
        this.listaPassageiros.placa = value.value;
        this.valid[1] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateMotoristaHandler = function (value) {
        this.listaPassageiros.motorista = value.value;
        this.valid[2] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateLocalSaidaHandler = function (value) {
        this.listaPassageiros.origem = value.value;
        this.valid[3] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateDestinoHandler = function (value) {
        this.listaPassageiros.destino = value.value;
        this.valid[4] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateDataSaidaHandler = function (value) {
        this.listaPassageiros.dataSaida = value.value;
        this.valid[5] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateHoraSaidaHandler = function (value) {
        this.listaPassageiros.horaSaida = value.value;
        this.valid[6] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateDataRetornoHandler = function (value) {
        this.listaPassageiros.dataRetorno = value.value;
        this.valid[7] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateHoraRetornoHandler = function (value) {
        this.listaPassageiros.horaRetorno = value.value;
        this.valid[8] = value.valid;
    };
    ListaPassageirosComponent.prototype.updateExtensaoKmHandler = function (value) {
        this.listaPassageiros.extensaoRoteiroKm = value.value;
    };
    ListaPassageirosComponent.prototype.updateNomeHandler = function (value) {
        var _this = this;
        this.passageiro.nome = value.nome;
        var idSelected = value.id;
        this.valid[9] = value.valid;
        this.clientes.forEach(function (element) {
            if (idSelected == element.id) {
                console.log(element);
                _this.updateDocumentoHandler({ value: element.documento || '', valid: true });
            }
        });
    };
    ListaPassageirosComponent.prototype.updateDocumentoHandler = function (value) {
        this.passageiro.documento = value.value;
        this.valid[10] = value.valid;
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
                common_1.NgFor,
                input_text_component_1.InputTextComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent,
                input_autocomplete_data_client_component_1.InputAutocompleteDataCLientComponent
            ],
            templateUrl: './lista-passageiros.component.html',
            styleUrl: './lista-passageiros.component.css'
        })
    ], ListaPassageirosComponent);
    return ListaPassageirosComponent;
}());
exports.ListaPassageirosComponent = ListaPassageirosComponent;
