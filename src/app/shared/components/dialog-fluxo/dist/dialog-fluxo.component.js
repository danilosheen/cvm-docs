"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogFluxoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var input_text_component_1 = require("../input-text/input-text.component");
var input_number_component_1 = require("../input-number/input-number.component");
var input_date_component_1 = require("../input-date/input-date.component");
var input_select_component_1 = require("../input-select/input-select.component");
var DialogFluxoComponent = /** @class */ (function () {
    function DialogFluxoComponent() {
        this.dialogRef = core_1.inject(dialog_1.MatDialogRef());
        this.valid = [];
        this.tiposMovimentacao = ['ENTRADA', 'SAIDA'];
        this.formasPagamento = ['PIX', 'DINHEIRO', 'CARTAO_DE_CREDITO'];
        this.dataFluxo = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        this.fluxoDataClean = {
            data: '',
            tipo: '',
            descricao: '',
            valor: null,
            formaPagamento: ''
        };
        this.fluxoData = this.dataFluxo.fluxo || this.fluxoDataClean;
        this.inputsDialog = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        for (var i = 0; i < 5; i++) {
            this.valid.push(false);
        }
        if (this.dataFluxo.editFluxo) {
            this.updateDataMovimentacaoHandler({ value: this.fluxoData.data, valid: true });
            this.updateTipoMovimentacaoHandler({ value: this.fluxoData.tipo, valid: true });
            this.updateDescricaoHandler({ value: this.fluxoData.descricao, valid: true });
            this.updateValorHandler({ value: this.fluxoData.valor, valid: true });
            this.updateFormaPagamentoHandler({ value: this.fluxoData.formaPagamento, valid: true });
        }
    }
    DialogFluxoComponent.prototype.dateNow = function () {
        return new Date();
    };
    DialogFluxoComponent.prototype.isValid = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    DialogFluxoComponent.prototype.formatarParaBRL = function (valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor).replace("R$", "").trim();
    };
    Object.defineProperty(DialogFluxoComponent.prototype, "valorFormatado", {
        get: function () {
            if (this.fluxoData.valor) {
                return this.fluxoData.valor.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    DialogFluxoComponent.prototype.converterValorStringToFloat = function () {
        this.fluxoData.valor = parseFloat(this.fluxoData.valor
            .toString()
            .replace(".", "")
            .replace(",", "."));
    };
    DialogFluxoComponent.prototype.updateDataMovimentacaoHandler = function (value) {
        this.fluxoData.data = value.value;
        this.valid[0] = value.valid;
    };
    DialogFluxoComponent.prototype.updateTipoMovimentacaoHandler = function (value) {
        this.fluxoData.tipo = value.value;
        this.valid[1] = value.valid;
    };
    DialogFluxoComponent.prototype.updateDescricaoHandler = function (value) {
        this.fluxoData.descricao = value.value;
        this.valid[2] = value.valid;
    };
    DialogFluxoComponent.prototype.updateValorHandler = function (value) {
        this.fluxoData.valor = value.value;
        this.valid[3] = value.valid;
    };
    DialogFluxoComponent.prototype.updateFormaPagamentoHandler = function (value) {
        this.fluxoData.formaPagamento = value.value;
        this.valid[4] = value.valid;
    };
    DialogFluxoComponent.prototype.onNoClick = function () {
        if (this.dataFluxo.valor) {
            this.converterValorStringToFloat();
        }
        this.dialogRef.close();
    };
    DialogFluxoComponent.prototype.onClickHandler = function () {
        this.converterValorStringToFloat();
        this.dialogRef.close(this.fluxoData);
    };
    DialogFluxoComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-fluxo',
            imports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogContent,
                dialog_1.MatDialogActions,
                input_text_component_1.InputTextComponent,
                input_number_component_1.InputNumberComponent,
                input_select_component_1.InputSelectComponent,
                input_date_component_1.InputDateComponent
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-fluxo.component.html',
            styleUrl: './dialog-fluxo.component.css'
        })
    ], DialogFluxoComponent);
    return DialogFluxoComponent;
}());
exports.DialogFluxoComponent = DialogFluxoComponent;
