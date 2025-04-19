"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogPassageiroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var input_text_component_1 = require("../input-text/input-text.component");
var input_number_component_1 = require("../input-number/input-number.component");
var input_radio_component_1 = require("../input-radio/input-radio.component");
var DialogPassageiroComponent = /** @class */ (function () {
    function DialogPassageiroComponent() {
        this.dialogRef = core_1.inject(dialog_1.MatDialogRef());
        this.valid = [];
        this.typesDocument = ['RG', 'CPF', 'Registro'];
        this.inputsData = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        this.passageiroClean = {
            nome: '',
            typeDocumentSelected: 'RG',
            documento: ''
        };
        this.passageiroData = this.inputsData.passageiro || this.passageiroClean;
        this.title = this.inputsData.title;
        this.confirmButton = this.inputsData.confirmButton;
        // inicia validadores como false
        for (var i = 0; i < 2; i++) {
            this.valid.push(false);
        }
    }
    DialogPassageiroComponent.prototype.dateNow = function () {
        return new Date();
    };
    DialogPassageiroComponent.prototype.isValid = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    // Action buttons
    DialogPassageiroComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogPassageiroComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(this.passageiroData);
    };
    // Handlers
    DialogPassageiroComponent.prototype.updateNomeClienteHandler = function (value) {
        this.passageiroData.nome = value.value;
        this.valid[0] = value.valid;
    };
    DialogPassageiroComponent.prototype.updateDocumentSelectedHandler = function (value) {
        if (this.passageiroData.typeDocumentSelected !== value.value) {
            this.passageiroData.documento = '';
        }
        this.passageiroData.typeDocumentSelected = value.value;
    };
    DialogPassageiroComponent.prototype.updateDocumentoClienteHandler = function (value) {
        this.passageiroData.documento = value.value;
        this.valid[1] = value.valid;
    };
    DialogPassageiroComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-passageiro',
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
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-passageiro.component.html',
            styleUrl: './dialog-passageiro.component.css'
        })
    ], DialogPassageiroComponent);
    return DialogPassageiroComponent;
}());
exports.DialogPassageiroComponent = DialogPassageiroComponent;
