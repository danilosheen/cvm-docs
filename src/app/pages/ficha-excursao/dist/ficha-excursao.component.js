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
var icon_1 = require("@angular/material/icon");
var input_checkbox_component_1 = require("../../shared/components/input-checkbox/input-checkbox.component");
var input_radio_component_1 = require("../../shared/components/input-radio/input-radio.component");
var dialog_component_1 = require("../../shared/components/dialog/dialog.component");
var dialog_1 = require("@angular/material/dialog");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var cliente_service_1 = require("../../core/services/clienteService/cliente.service");
var input_autocomplete_data_client_component_1 = require("../../shared/components/input-autocomplete-data-client/input-autocomplete-data-client.component");
var FichaExcursaoComponent = /** @class */ (function () {
    function FichaExcursaoComponent(pdfFichaExcursao, router) {
        this.pdfFichaExcursao = pdfFichaExcursao;
        this.router = router;
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.valid = [];
        this.showModalDependente = false;
        this.cidades = ["Juazeiro do Norte", "Crato", "Barbalha"];
        this.hospedagens = ['Casa de praia', 'Pousada', 'Hotel'];
        this.typesDocument = ['RG', 'CPF', 'Registro'];
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.clientes = [];
        this.nomesClientes = [];
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
                typeDocumentSelected: 'RG',
                documento: '',
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
            entradaParcelamento: '0,00',
            valorParcelas: '',
            qtdParcelas: '',
            dataPagamentoParcela: '',
            dependentes: []
        };
        //inicializando o array de campos válidos
        for (var i = 0; i <= 16; i++) {
            this.valid.push(false);
        }
    }
    FichaExcursaoComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.clienteService.getAll().subscribe(function (result) {
                _this.clientes = result;
                _this.loadClientListNames();
            });
        }
        catch (error) {
            alert("Seu token de acesso expirou, faça login novamente!");
            this.router.navigate(['/']);
        }
    };
    FichaExcursaoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        console.log(this.fichaExcursaoData);
        if (!this.fichaExcursaoData.cliente.documento) {
            this.fichaExcursaoData.cliente.documento = 'Não informado';
        }
        if (!this.fichaExcursaoData.cliente.dataNascimento) {
            this.fichaExcursaoData.cliente.dataNascimento = 'Não informado';
        }
        this.pdfFichaExcursao.generatePDF(this.fichaExcursaoData)
            .subscribe(function (pdfBlob) {
            // this.clienteService.saveClient(this.filtraDados(this.fichaExcursaoData), this.clientes);
            // this.clientes = this.clienteService.getAllClients();
            var nomeClienteFormated = _this.formatNomeCliente();
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Ficha de Excurs\u00E3o CVM - " + nomeClienteFormated + " " + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
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
    FichaExcursaoComponent.prototype.loadClientListNames = function () {
        if (this.clientes) {
            for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
                var cliente = _a[_i];
                this.nomesClientes.push({ nome: cliente.nome, id: cliente.id });
            }
        }
    };
    FichaExcursaoComponent.prototype.filtraDados = function (dadosFichaExcursao) {
        return {
            nome: dadosFichaExcursao.cliente.nome,
            dataNascimento: dadosFichaExcursao.cliente.dataNascimento,
            contato: dadosFichaExcursao.cliente.contato,
            typeDocumentSelected: dadosFichaExcursao.cliente.typeDocumentSelected,
            documento: dadosFichaExcursao.cliente.documento,
            cidade: dadosFichaExcursao.cliente.endereco.cidade,
            bairro: dadosFichaExcursao.cliente.endereco.bairro,
            rua: dadosFichaExcursao.cliente.endereco.rua,
            numero: dadosFichaExcursao.cliente.endereco.numero
        };
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
        if (this.fichaExcursaoData.valorIntegralExcursao && this.fichaExcursaoData.qtdParcelas) {
            this.atualizaValorParcela(this.fichaExcursaoData.valorIntegralExcursao, this.fichaExcursaoData.qtdParcelas, this.fichaExcursaoData.entradaParcelamento);
        }
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    FichaExcursaoComponent.prototype.atualizaValorParcela = function (valorIntegral, qtdParcelas, entrada) {
        var valorIntegralLimpo = valorIntegral.replace(/\./g, '').replace(',', '.');
        var valorEntradalLimpo = entrada.replace(/\./g, '').replace(',', '.');
        var intValorIntegral = parseFloat(valorIntegralLimpo);
        var intValorEntrada = parseFloat(valorEntradalLimpo) || 0;
        var intQtdParcelas = parseFloat(qtdParcelas);
        var valorParcela = (intValorIntegral - intValorEntrada) / intQtdParcelas;
        var valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valorParcela);
        this.fichaExcursaoData.valorParcelas = valorFormatado;
    };
    FichaExcursaoComponent.prototype.openDialog = function (enterAnimationDuration, exitAnimationDuration, i) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            width: '250px',
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                dialogTitle: 'Remover dependente',
                dialogContent: 'Você tem certeza que deseja remover o dependente?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.fichaExcursaoData.dependentes.splice(i, 1);
            }
        });
    };
    FichaExcursaoComponent.prototype.toggleModalDependente = function () {
        this.showModalDependente = !this.showModalDependente;
    };
    FichaExcursaoComponent.prototype.updateExcursaoParaHandler = function (value) {
        this.fichaExcursaoData.excursaoPara = value.value.toUpperCase();
        this.valid[0] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateLocalSaidaHandler = function (value) {
        this.fichaExcursaoData.localSaida = value.value;
        this.valid[1] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataSaidaHandler = function (value) {
        this.fichaExcursaoData.dataSaida = value.value;
        this.valid[2] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateHoraSaidaHandler = function (value) {
        this.fichaExcursaoData.horaSaida = value.value;
        this.valid[3] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataRetornoHandler = function (value) {
        this.fichaExcursaoData.dataRetorno = value.value;
        this.valid[4] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateHoraRetornoHandler = function (value) {
        this.fichaExcursaoData.horaRetorno = value.value;
        this.valid[5] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateNomeClienteHandler = function (value) {
        var _this = this;
        this.fichaExcursaoData.cliente.nome = value.nome;
        var idSelected = value.id;
        this.valid[6] = (value.valid);
        this.clientes.forEach(function (element) {
            if (idSelected == element.id) {
                _this.updateDataNascimentoHandler({ value: element.dataNascimento, valid: true });
                _this.updateContatoHandler({ value: element.contato, valid: true });
                _this.updateTypeDocumentSelectedHandler({ value: element.typeDocumentSelected || '', valid: true });
                _this.updateDocumentHandler({ value: element.documento || '', valid: true });
                _this.updateCidadeHandler({ value: element.cidade, valid: true });
                _this.updateBairroHandler({ value: element.bairro, valid: true });
                _this.updateRuaHandler({ value: element.rua, valid: true });
                _this.updateNumeroCasaHandler({ value: element.numero, valid: true });
            }
        });
    };
    FichaExcursaoComponent.prototype.updateDataNascimentoHandler = function (value) {
        if (value.value != 'NaN/NaN/NaN') {
            this.fichaExcursaoData.cliente.dataNascimento = value.value;
        }
    };
    FichaExcursaoComponent.prototype.updateContatoHandler = function (value) {
        this.fichaExcursaoData.cliente.contato = value.value;
        this.valid[7] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateTypeDocumentSelectedHandler = function (value) {
        this.fichaExcursaoData.cliente.typeDocumentSelected = value.value;
    };
    FichaExcursaoComponent.prototype.updateDocumentHandler = function (value) {
        this.fichaExcursaoData.cliente.documento = value.value;
    };
    FichaExcursaoComponent.prototype.updateCidadeHandler = function (value) {
        this.fichaExcursaoData.cliente.endereco.cidade = value.value;
        this.valid[8] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateBairroHandler = function (value) {
        this.fichaExcursaoData.cliente.endereco.bairro = value.value;
        this.valid[9] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateRuaHandler = function (value) {
        this.fichaExcursaoData.cliente.endereco.rua = value.value;
        this.valid[10] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateNumeroCasaHandler = function (value) {
        this.fichaExcursaoData.cliente.endereco.numero = value.value;
        this.valid[11] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateServicosSelecionadosHandler = function (value) {
        var services = {
            cafeDaManha: 'Café da manhã',
            almoco: 'Almoço',
            jantar: 'Jantar',
            roteiro: 'Roteiro'
        };
        var servicosFormatados = value.map(function (item) { return services[item] || item; });
        this.fichaExcursaoData.servicos = servicosFormatados;
        this.valid[12] = !!value.length;
    };
    FichaExcursaoComponent.prototype.updateTipoHospedagemHandler = function (value) {
        this.fichaExcursaoData.tipoDeHospedagem = value.value;
        this.valid[13] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateValorTotalExcursaoHandler = function (value) {
        this.fichaExcursaoData.valorIntegralExcursao = value.value;
        this.valid[14] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateEntradaParcelamentoHandler = function (value) {
        this.fichaExcursaoData.entradaParcelamento = value.value;
    };
    FichaExcursaoComponent.prototype.updateQtdParcelasHandler = function (value) {
        this.fichaExcursaoData.qtdParcelas = value.value;
        this.valid[15] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDataVencimentoHandler = function (value) {
        this.fichaExcursaoData.dataPagamentoParcela = value.value;
        this.valid[16] = (value.valid);
    };
    FichaExcursaoComponent.prototype.updateDependentesHandler = function (value) {
        this.fichaExcursaoData.dependentes.push(value);
    };
    FichaExcursaoComponent = __decorate([
        core_1.Component({
            selector: 'app-ficha-excursao',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                common_1.NgIf,
                common_1.NgFor,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                input_text_component_1.InputTextComponent,
                input_autocomplete_component_1.InputAutocompleteComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent,
                input_number_component_1.InputNumberComponent,
                input_checkbox_component_1.InputCheckboxComponent,
                input_radio_component_1.InputRadioComponent,
                dialog_component_1.DialogComponent,
                input_autocomplete_data_client_component_1.InputAutocompleteDataCLientComponent
            ],
            templateUrl: './ficha-excursao.component.html',
            styleUrl: './ficha-excursao.component.css'
        })
    ], FichaExcursaoComponent);
    return FichaExcursaoComponent;
}());
exports.FichaExcursaoComponent = FichaExcursaoComponent;
