"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogFromMenu = exports.DialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var menu_1 = require("@angular/material/menu");
var tooltip_1 = require("@angular/material/tooltip");
var input_text_component_1 = require("../input-text/input-text.component");
var input_number_component_1 = require("../input-number/input-number.component");
var input_radio_component_1 = require("../input-radio/input-radio.component");
var DialogComponent = /** @class */ (function () {
    function DialogComponent() {
        this.sendDependente = new core_1.EventEmitter();
        this.menuTrigger = core_1.viewChild.required(menu_1.MatMenuTrigger);
        this.dialog = core_1.inject(dialog_1.MatDialog);
    }
    DialogComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogFromMenu, { restoreFocus: false });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.sendDependente.emit(result);
            }
            _this.menuTrigger().focus();
        });
    };
    __decorate([
        core_1.Output()
    ], DialogComponent.prototype, "sendDependente");
    DialogComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog',
            imports: [
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
                tooltip_1.MatTooltipModule,
                icon_1.MatIconModule,
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog.component.html',
            styleUrl: './dialog.component.css'
        })
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
var DialogFromMenu = /** @class */ (function () {
    function DialogFromMenu() {
        this.dialogRef = core_1.inject(dialog_1.MatDialogRef());
        this.nome = '';
        this.documento = '';
        this.poltrona = '';
        this.dependentes = [];
        this.valid = [];
        this.typesDocument = ['RG', 'CPF', 'Registro'];
        this.typeDocumentSelected = 'RG';
        for (var i = 0; i < 2; i++) {
            this.valid.push(false);
        }
    }
    DialogFromMenu.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogFromMenu.prototype.adicionarDependente = function (nome, documento, poltrona) {
        if (this.isValid()) {
            var novoDependente = { nome: nome, documento: documento, poltrona: poltrona };
            this.dialogRef.close(novoDependente);
        }
    };
    DialogFromMenu.prototype.isValid = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    DialogFromMenu.prototype.updateNomeDependenteHandler = function (value) {
        this.nome = value.value;
        this.valid[0] = value.valid;
    };
    DialogFromMenu.prototype.updateDocumentoDependenteHandler = function (value) {
        if (value.value == '') {
            this.documento = 'Não informado.';
        }
        else {
            this.documento = value.value;
        }
    };
    DialogFromMenu.prototype.updateDocumentSelectedHandler = function (value) {
        this.typeDocumentSelected = value.value;
    };
    DialogFromMenu.prototype.updatePoltronaDependenteHandler = function (value) {
        this.poltrona = value.value;
        this.valid[1] = value.valid;
    };
    DialogFromMenu = __decorate([
        core_1.Component({
            selector: 'dialog-from-menu-dialog',
            templateUrl: 'dialog-from-menu.component.html',
            styleUrl: './dialog.component.css',
            imports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogContent,
                dialog_1.MatDialogActions,
                input_text_component_1.InputTextComponent,
                input_number_component_1.InputNumberComponent,
                input_radio_component_1.InputRadioComponent
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DialogFromMenu);
    return DialogFromMenu;
}());
exports.DialogFromMenu = DialogFromMenu;
