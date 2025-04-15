"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogClienteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var input_text_component_1 = require("../input-text/input-text.component");
var input_number_component_1 = require("../input-number/input-number.component");
var input_radio_component_1 = require("../input-radio/input-radio.component");
var input_date_component_1 = require("../input-date/input-date.component");
var DialogClienteComponent = /** @class */ (function () {
    function DialogClienteComponent() {
        this.dialogRef = core_1.inject(dialog_1.MatDialogRef());
        this.valid = [];
        this.typesDocument = ['CPF', 'RG'];
        this.typeDocumentSelected = 'CPF';
        this.clienteData = {
            nome: '',
            dataNascimento: '',
            contato: '',
            cpf: '',
            documento: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            updatedAt: this.dateNow()
        };
        for (var i = 0; i < 7; i++) {
            this.valid.push(false);
        }
    }
    DialogClienteComponent.prototype.dateNow = function () {
        return new Date();
    };
    // adicionarDependente(nome: string, documento: string, poltrona: string){
    //   if(this.isValid()){
    //     const novoDependente = { nome, documento, poltrona };
    //     this.dialogRef.close(novoDependente);
    //   }
    // }
    DialogClienteComponent.prototype.isValid = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    DialogClienteComponent.prototype.updateNomeClienteHandler = function (value) {
        this.clienteData.nome = value.value;
        this.valid[0] = value.valid;
    };
    DialogClienteComponent.prototype.updateDataNascimentoHandler = function (value) {
        this.clienteData.dataNascimento = value.value;
        this.valid[1] = value.valid;
    };
    DialogClienteComponent.prototype.updateContatoHandler = function (value) {
        this.clienteData.contato = value.value;
        this.valid[2] = value.valid;
    };
    DialogClienteComponent.prototype.updateDocumentSelectedHandler = function (value) {
        this.typeDocumentSelected = value.value;
    };
    DialogClienteComponent.prototype.updateDocumentoClienteHandler = function (value) {
        this.clienteData.documento = value.value;
    };
    DialogClienteComponent.prototype.updateCidadeHandler = function (value) {
        this.clienteData.cidade = value.value;
        this.valid[3] = value.valid;
    };
    DialogClienteComponent.prototype.updateBairroHandler = function (value) {
        this.clienteData.bairro = value.value;
        this.valid[4] = value.valid;
    };
    DialogClienteComponent.prototype.updateRuaHandler = function (value) {
        this.clienteData.rua = value.value;
        this.valid[5] = value.valid;
    };
    DialogClienteComponent.prototype.updateNumeroHandler = function (value) {
        this.clienteData.numero = value.value;
        this.valid[6] = value.valid;
    };
    DialogClienteComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogClienteComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(this.clienteData);
    };
    DialogClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-cliente',
            imports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogContent,
                dialog_1.MatDialogActions,
                input_text_component_1.InputTextComponent,
                input_number_component_1.InputNumberComponent,
                input_radio_component_1.InputRadioComponent,
                input_date_component_1.InputDateComponent
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-cliente.component.html',
            styleUrl: './dialog-cliente.component.css'
        })
    ], DialogClienteComponent);
    return DialogClienteComponent;
}());
exports.DialogClienteComponent = DialogClienteComponent;
