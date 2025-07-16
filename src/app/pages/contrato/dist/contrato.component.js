"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContratoComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_radio_component_1 = require("../../shared/components/input-radio/input-radio.component");
var input_autocomplete_data_pessoa_component_1 = require("../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component");
var cliente_service_1 = require("../../core/services/clienteService/cliente.service");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var input_text_component_1 = require("../../shared/components/input-text/input-text.component");
var input_date_component_1 = require("../../shared/components/input-date/input-date.component");
var input_time_component_1 = require("../../shared/components/input-time/input-time.component");
var input_autocomplete_component_1 = require("../../shared/components/input-autocomplete/input-autocomplete.component");
var common_1 = require("@angular/common");
var cotrato_service_1 = require("../../core/services/contratoService/cotrato.service");
var router_1 = require("@angular/router");
var behavior_subject_service_1 = require("../../core/services/behaviorSubjectService/behavior-subject.service");
var button_1 = require("@angular/material/button");
var contrato_history_service_1 = require("../../core/services/contratoHistoryService/contrato-history.service");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var ContratoComponent = /** @class */ (function () {
    function ContratoComponent() {
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.pdfContratoService = core_1.inject(cotrato_service_1.CotratoService);
        this.clientes = [];
        this.nomeClientes = [];
        this.documentosList = ['CPF', 'RG', 'CNPJ'];
        this.modalidadesContrato = ['NORMAL', 'POR KM'];
        this.locaisSaida = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
        this.valid = [];
        this.loading = false;
        this.isLoadingClientes = true;
        this.isLoadingContratoBehaviorSubject = true;
        // behavior subject contrato
        this.router = core_1.inject(router_1.Router);
        this.contratoBehaviorSubject = core_1.inject(behavior_subject_service_1.BehaviorSubjectService);
        this.contratoHistoryService = core_1.inject(contrato_history_service_1.ContratoHistoryService);
        this.maxRetries = 3;
        this.retryDelay = 2000; // 2 segundos
        this.retryCount = 0;
        for (var i = 0; i <= 18; i++) {
            this.valid.push({ index: i, value: false });
        }
        // montagem do objeto
        this.contratoData = {
            tipoContrato: '',
            nomeCliente: '',
            documento: '',
            endereco: {
                rua: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
            placaVeiculo: '',
            descricaoVeiculo: '',
            dataInicial: '',
            horaInicial: '',
            dataFinal: '',
            horaFinal: '',
            origem: '',
            destino: '',
            detalhesLocacao: {
                tipoContratoLocacao: 'NORMAL',
                valorTotal: null,
                kmTotal: null,
                valorKmExcedido: null,
                kmCortesia: null
            }
        };
        // preenche valores padrão
        this.updateTipoContratoHandler({ value: 'CPF', valid: true });
        this.updatePlacaVeiculoHandler({ value: 'OSQ1G19', valid: true });
        this.updateDescricaoVeiculoHandler({ value: 'Van MiniBus Mercedes Sprinter 515', valid: true });
        this.updateTipoContratoLocacaoHandler({ value: 'NORMAL', valid: true });
    }
    ContratoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (clientes) {
            _this.clientes = clientes;
            for (var _i = 0, clientes_1 = clientes; _i < clientes_1.length; _i++) {
                var cliente = clientes_1[_i];
                _this.nomeClientes.push({ nome: cliente.nome, id: cliente.id });
            }
            _this.isLoadingClientes = false;
        });
        // nav vindo do history
        this.contratoBehaviorSubject.contratoSelecionado$.subscribe(function (data) {
            if (data) {
                console.log(data);
                _this.contratoData = data;
                _this.isLoadingContratoBehaviorSubject = false;
            }
            else {
                _this.isLoadingContratoBehaviorSubject = false;
            }
        });
    };
    ContratoComponent.prototype.onSubmit = function () {
        this.loading = true;
        var date = new Date();
        var nomeClienteFormated = this.formatNomeCliente();
        var pdfName = "Contrato CVM - " + nomeClienteFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
        this.tryGenerateContratoPdf(pdfName);
        this.createContratoHistory();
    };
    ContratoComponent.prototype.tryGenerateContratoPdf = function (pdfName) {
        var _this = this;
        this.pdfContratoService.generatePDF({ pdfData: this.contratoData, pdfName: pdfName })
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
            if (_this.retryCount < _this.maxRetries) {
                _this.retryCount++;
                console.warn("Tentativa " + _this.retryCount + " falhou. Retentando em " + _this.retryDelay + "ms...");
                setTimeout(function () { return _this.tryGenerateContratoPdf(pdfName); }, _this.retryDelay);
            }
            else {
                console.error('Erro ao gerar o PDF após múltiplas tentativas:', error);
                _this.loading = false;
                _this.retryCount = 0;
            }
        });
    };
    ContratoComponent.prototype.createContratoHistory = function () {
        this.contratoHistoryService.createContratoHistory(this.contratoData).subscribe({
            next: function (result) {
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    ContratoComponent.prototype.formatNomeCliente = function () {
        try {
            var nome = "" + this.contratoData.nomeCliente.split(" ")[0];
            var index = this.contratoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.contratoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
            var sobrenome = "" + this.contratoData.nomeCliente.split(" ")[index];
            var nomeClienteFormated = nome + " " + sobrenome;
            return nomeClienteFormated;
        }
        catch (error) {
            return "" + this.contratoData.nomeCliente.split(" ")[0];
        }
    };
    ContratoComponent.prototype.camposValidos = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.value == false) {
                return false;
            }
        }
        return true;
    };
    // Handlers
    ContratoComponent.prototype.updateTipoContratoHandler = function (value) {
        this.updateDocumentoHandler({ value: '', valid: false });
        this.contratoData.tipoContrato = value.value;
        this.valid[0].value = value.valid;
    };
    ContratoComponent.prototype.updateNomeClienteHandler = function (value) {
        var _this = this;
        var idSelected = value.value.id;
        if (idSelected) {
            this.clientes.forEach(function (cliente) {
                if (cliente.id == idSelected) {
                    _this.contratoData.nomeCliente = cliente.nome;
                    _this.updateTipoContratoHandler({ value: cliente.typeDocumentSelected, valid: true });
                    _this.updateDocumentoHandler({ value: cliente.documento, valid: true });
                    _this.updateRuaHandler({ value: cliente.rua || '', valid: true });
                    _this.updateNumeroHandler({ value: cliente.numero || '', valid: true });
                    _this.updateBairroHandler({ value: cliente.bairro || '', valid: true });
                    _this.updateCidadeHandler({ value: cliente.cidade || '', valid: true });
                    _this.updateEstadoHandler({ value: cliente.estado || '', valid: true });
                    _this.valid[1].value = true;
                    return;
                }
            });
        }
        else {
            this.contratoData.nomeCliente = value.value.nome;
            this.valid[1].value = value.valid;
        }
    };
    ContratoComponent.prototype.updateDocumentoHandler = function (value) {
        this.contratoData.documento = value.value;
        this.valid[2].value = value.valid;
    };
    ContratoComponent.prototype.updateRuaHandler = function (value) {
        this.contratoData.endereco.rua = value.value;
        this.valid[3].value = value.valid;
    };
    ContratoComponent.prototype.updateNumeroHandler = function (value) {
        this.contratoData.endereco.numero = value.value;
        this.valid[4].value = value.valid;
    };
    ContratoComponent.prototype.updateBairroHandler = function (value) {
        this.contratoData.endereco.bairro = value.value;
        this.valid[5].value = value.valid;
    };
    ContratoComponent.prototype.updateCidadeHandler = function (value) {
        this.contratoData.endereco.cidade = value.value;
        this.valid[6].value = value.valid;
    };
    ContratoComponent.prototype.updateEstadoHandler = function (value) {
        this.contratoData.endereco.estado = value.value;
        this.valid[7].value = value.valid;
    };
    ContratoComponent.prototype.updatePlacaVeiculoHandler = function (value) {
        this.contratoData.placaVeiculo = value.value;
        this.valid[8].value = value.valid;
    };
    ContratoComponent.prototype.updateDescricaoVeiculoHandler = function (value) {
        this.contratoData.descricaoVeiculo = value.value;
        this.valid[9].value = value.valid;
    };
    ContratoComponent.prototype.updateDataInicialHandler = function (value) {
        this.contratoData.dataInicial = value.value;
        this.valid[10].value = value.valid;
    };
    ContratoComponent.prototype.updateHoraInicialHandler = function (value) {
        this.contratoData.horaInicial = value.value;
        this.valid[11].value = value.valid;
    };
    ContratoComponent.prototype.updateDataFinalHandler = function (value) {
        this.contratoData.dataFinal = value.value;
        this.valid[12].value = value.valid;
    };
    ContratoComponent.prototype.updateHoraFinalHandler = function (value) {
        this.contratoData.horaFinal = value.value;
        this.valid[13].value = value.valid;
    };
    ContratoComponent.prototype.updateOrigemHandler = function (value) {
        this.contratoData.origem = value.value;
        this.valid[14].value = value.valid;
    };
    ContratoComponent.prototype.updateDestinoHandler = function (value) {
        this.contratoData.destino = value.value;
        this.valid[15].value = value.valid;
    };
    ContratoComponent.prototype.updateTipoContratoLocacaoHandler = function (value) {
        this.contratoData.detalhesLocacao.tipoContratoLocacao = value.value;
        this.valid[16].value = value.valid;
    };
    ContratoComponent.prototype.updateValorTotalHandler = function (value) {
        this.contratoData.detalhesLocacao.valorTotal = value.value;
        this.valid[17].value = value.valid;
    };
    ContratoComponent.prototype.updateKmTotalHandler = function (value) {
        this.contratoData.detalhesLocacao.kmTotal = value.value;
        this.valid[18].value = value.valid;
    };
    ContratoComponent.prototype.updateValorKmExcedidoHandler = function (value) {
        this.contratoData.detalhesLocacao.valorKmExcedido = value.value;
    };
    ContratoComponent.prototype.updateKmCortesiaHandler = function (value) {
        this.contratoData.detalhesLocacao.kmCortesia = value.value;
    };
    ContratoComponent = __decorate([
        core_1.Component({
            selector: 'app-contrato',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                input_radio_component_1.InputRadioComponent,
                input_autocomplete_data_pessoa_component_1.InputAutocompleteDataPessoaComponent,
                input_number_component_1.InputNumberComponent,
                input_text_component_1.InputTextComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                loading_blue_component_1.LoadingBlueComponent
            ],
            templateUrl: './contrato.component.html',
            styleUrl: './contrato.component.css'
        })
    ], ContratoComponent);
    return ContratoComponent;
}());
exports.ContratoComponent = ContratoComponent;
