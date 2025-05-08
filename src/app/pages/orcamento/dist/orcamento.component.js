"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var icon_1 = require("@angular/material/icon");
var input_text_component_1 = require("../../shared/components/input-text/input-text.component");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var input_date_component_1 = require("../../shared/components/input-date/input-date.component");
var input_time_component_1 = require("../../shared/components/input-time/input-time.component");
var input_autocomplete_component_1 = require("../../shared/components/input-autocomplete/input-autocomplete.component");
var cliente_service_1 = require("../../core/services/clienteService/cliente.service");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var input_autocomplete_data_pessoa_component_1 = require("../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component");
var OrcamentoComponent = /** @class */ (function () {
    function OrcamentoComponent(pdfOrcamento) {
        this.pdfOrcamento = pdfOrcamento;
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.orcamentoData = {
            nomeCliente: '',
            telefoneContato: '',
            localSaida: '',
            destinoViagem: '',
            dataSaida: '',
            horaSaida: '',
            dataRetorno: '',
            horaRetorno: '',
            valorComDespesa: '',
            valorSemDespesa: '',
            valorComNota: '',
            taxaPix: '',
            modeloVan: '',
            cortesiaKm: '',
            valorAcrescimoKm: ''
        };
        this.valid = [];
        this.cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.clientes = [];
        this.nomeClientes = [];
        this.isLoadingClientes = true;
        //inicializando o array de campos válidos
        for (var i = 0; i <= 11; i++) {
            this.valid.push(false);
        }
    }
    OrcamentoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (clientes) {
            _this.clientes = clientes;
            for (var _i = 0, clientes_1 = clientes; _i < clientes_1.length; _i++) {
                var cliente = clientes_1[_i];
                _this.nomeClientes.push({ nome: cliente.nome, id: cliente.id });
            }
            _this.isLoadingClientes = false;
        });
    };
    OrcamentoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        var date = new Date();
        var nomeClienteFormated = this.formatNomeCliente();
        var pdfName = "Or\u00E7. CVM - " + nomeClienteFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
        this.pdfOrcamento.generatePDF({ pdfData: this.orcamentoData, pdfName: pdfName })
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
    OrcamentoComponent.prototype.formatNomeCliente = function () {
        try {
            var nome = "" + this.orcamentoData.nomeCliente.split(" ")[0];
            var index = this.orcamentoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "de" || this.orcamentoData.nomeCliente.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
            var sobrenome = "" + this.orcamentoData.nomeCliente.split(" ")[index];
            var nomeClienteFormated = nome + " " + sobrenome;
            return nomeClienteFormated;
        }
        catch (error) {
            return "" + this.orcamentoData.nomeCliente.split(" ")[0];
        }
    };
    OrcamentoComponent.prototype.camposValidos = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    // Handler para os campos
    OrcamentoComponent.prototype.updateNomeClienteHandler = function (value) {
        var _this = this;
        var idSelected = value.id;
        if (idSelected) {
            this.clientes.forEach(function (cliente) {
                if (cliente.id == idSelected) {
                    _this.orcamentoData.nomeCliente = cliente.nome;
                    _this.updateTelefoneContatoHandler({ value: cliente.contato, valid: true });
                }
            });
        }
        else {
            this.orcamentoData.nomeCliente = value.value.nome;
        }
        this.valid[0] = (value.valid);
    };
    OrcamentoComponent.prototype.updateTelefoneContatoHandler = function (value) {
        console.log(value);
        this.orcamentoData.telefoneContato = value.value;
        this.valid[1] = (value.valid);
    };
    OrcamentoComponent.prototype.updateLocalSaidaHandler = function (value) {
        this.orcamentoData.localSaida = value.value;
        this.valid[3] = (value.valid);
    };
    OrcamentoComponent.prototype.updateDestinoViagemHandler = function (value) {
        this.orcamentoData.destinoViagem = value.value;
        this.valid[2] = (value.valid);
    };
    OrcamentoComponent.prototype.updateDataSaidaHandler = function (value) {
        this.orcamentoData.dataSaida = value.value;
        this.valid[4] = (value.valid);
    };
    OrcamentoComponent.prototype.updateHoraSaidaHandler = function (value) {
        this.orcamentoData.horaSaida = value.value;
        this.valid[5] = (value.valid);
    };
    OrcamentoComponent.prototype.updateDataRetornoHandler = function (value) {
        this.orcamentoData.dataRetorno = value.value;
        this.valid[6] = (value.valid);
    };
    OrcamentoComponent.prototype.updateHoraRetornoHandler = function (value) {
        this.orcamentoData.horaRetorno = value.value;
        this.valid[7] = (value.valid);
    };
    OrcamentoComponent.prototype.updateValorComDespezaHandler = function (value) {
        this.orcamentoData.valorComDespesa = value.value;
        this.valid[8] = (value.valid);
    };
    OrcamentoComponent.prototype.updateValorSemDespezaHandler = function (value) {
        this.orcamentoData.valorSemDespesa = value.value;
        this.valid[9] = (value.valid);
    };
    OrcamentoComponent.prototype.updateValorComNotaHandler = function (value) {
        this.orcamentoData.valorComNota = value.value;
        this.valid[10] = (value.valid);
    };
    OrcamentoComponent.prototype.updateTaxaPixHandler = function (value) {
        this.orcamentoData.taxaPix = value.value;
        this.valid[11] = (value.valid);
    };
    OrcamentoComponent.prototype.updateModeloVanHandler = function (value) {
        this.orcamentoData.modeloVan = value.value;
    };
    OrcamentoComponent.prototype.updateCortesiaKmHandler = function (value) {
        this.orcamentoData.cortesiaKm = value.value;
    };
    OrcamentoComponent.prototype.updateValorAcrescimoKmHandler = function (value) {
        this.orcamentoData.valorAcrescimoKm = value.value;
    };
    OrcamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-orcamento',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                forms_1.FormsModule,
                common_1.NgIf,
                button_1.MatButtonModule,
                divider_1.MatDividerModule,
                icon_1.MatIconModule,
                input_text_component_1.InputTextComponent,
                input_number_component_1.InputNumberComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                loading_blue_component_1.LoadingBlueComponent,
                input_autocomplete_data_pessoa_component_1.InputAutocompleteDataPessoaComponent
            ],
            templateUrl: './orcamento.component.html',
            styleUrl: './orcamento.component.css'
        })
    ], OrcamentoComponent);
    return OrcamentoComponent;
}());
exports.OrcamentoComponent = OrcamentoComponent;
