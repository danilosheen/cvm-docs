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
var input_select_component_1 = require("../../shared/components/input-select/input-select.component");
var input_date_component_1 = require("../../shared/components/input-date/input-date.component");
var input_time_component_1 = require("../../shared/components/input-time/input-time.component");
var OrcamentoComponent = /** @class */ (function () {
    // orcamentoForm: FormGroup<any> = new FormGroup({});
    function OrcamentoComponent(pdfOrcamento) {
        this.pdfOrcamento = pdfOrcamento;
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.orcamentoData = {
            nomeCliente: '',
            telefoneContato: '',
            pacoteViagem: '',
            localSaida: '',
            dataSaida: '',
            horaSaida: '',
            dataRetorno: '',
            horaRetorno: '',
            valor: '',
            modeloVan: '',
            valorAcrescimoKm: ''
        };
        this.cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
    }
    OrcamentoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.pdfOrcamento.generatePDF(this.orcamentoData)
            .subscribe(function (pdfBlob) {
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Orcamento CVM " + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
            link.click();
            _this.loading = false;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }, function (error) {
            console.error('Erro ao gerar o PDF:', error);
            _this.loading = false;
        });
    };
    // Handler para os campos
    OrcamentoComponent.prototype.updateNomeClienteHandler = function (value) {
        this.orcamentoData.nomeCliente = value;
    };
    OrcamentoComponent.prototype.updateTelefoneContatoHandler = function (value) {
        this.orcamentoData.telefoneContato = value;
    };
    OrcamentoComponent.prototype.updatePacoteViagemHandler = function (value) {
        this.orcamentoData.pacoteViagem = value;
    };
    OrcamentoComponent.prototype.updateLocalSaidaHandler = function (value) {
        this.orcamentoData.localSaida = value;
    };
    OrcamentoComponent.prototype.updateDataSaidaHandler = function (value) {
        this.orcamentoData.dataSaida = value;
    };
    OrcamentoComponent.prototype.updateHoraSaidaHandler = function (value) {
        this.orcamentoData.horaSaida = value;
    };
    OrcamentoComponent.prototype.updateDataRetornoHandler = function (value) {
        this.orcamentoData.dataRetorno = value;
    };
    OrcamentoComponent.prototype.updateHoraRetornoHandler = function (value) {
        this.orcamentoData.horaRetorno = value;
    };
    OrcamentoComponent.prototype.updateValorHandler = function (value) {
        this.orcamentoData.valor = value;
    };
    OrcamentoComponent.prototype.updateModeloVanHandler = function (value) {
        this.orcamentoData.modeloVan = value;
    };
    OrcamentoComponent.prototype.updateValorAcrescimoKmHandler = function (value) {
        this.orcamentoData.valorAcrescimoKm = value;
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
                input_select_component_1.InputSelectComponent,
                input_date_component_1.InputDateComponent,
                input_time_component_1.InputTimeComponent
            ],
            templateUrl: './orcamento.component.html',
            styleUrl: './orcamento.component.css'
        })
    ], OrcamentoComponent);
    return OrcamentoComponent;
}());
exports.OrcamentoComponent = OrcamentoComponent;
