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
var input_number_component_1 = require("../input-number/input-number.component");
var input_radio_component_1 = require("../input-radio/input-radio.component");
var input_autocomplete_data_pessoa_component_1 = require("../input-autocomplete-data-client/input-autocomplete-data-pessoa.component");
var dependente_service_service_1 = require("../../../core/services/dependenteService/dependente-service.service");
var loading_blue_component_1 = require("../loading-blue/loading-blue.component");
var DialogComponent = /** @class */ (function () {
    function DialogComponent() {
        this.idCliente = '';
        this.sendDependente = new core_1.EventEmitter();
        this.menuTrigger = core_1.viewChild.required(menu_1.MatMenuTrigger);
        this.dialog = core_1.inject(dialog_1.MatDialog);
    }
    DialogComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogFromMenu, {
            restoreFocus: false,
            autoFocus: false,
            data: {
                idCliente: this.idCliente
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.sendDependente.emit(result);
            }
            _this.menuTrigger().focus();
        });
    };
    __decorate([
        core_1.Input()
    ], DialogComponent.prototype, "idCliente");
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
        this.dialodData = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        this.nome = '';
        this.documento = '';
        this.poltrona = null;
        this.dependentes = [];
        this.dependentesOptions = [];
        this.valid = [];
        this.typesDocument = ['RG', 'CPF', 'Registro'];
        this.typeDocumentSelected = 'RG';
        this.dependenteService = core_1.inject(dependente_service_service_1.DependenteService);
        this.isLoadingDependentes = false;
        for (var i = 0; i < 2; i++) {
            this.valid.push(false);
        }
    }
    DialogFromMenu.prototype.ngOnInit = function () {
        var _this = this;
        this.dialogRef.afterOpened().subscribe(function () {
            if (_this.dialodData.idCliente) {
                _this.isLoadingDependentes = true;
                _this.dependenteService.getAll(_this.dialodData.idCliente).subscribe(function (response) {
                    _this.dependentes = response;
                    _this.isLoadingDependentes = false;
                    _this.povoaDependentesOptions();
                });
            }
        });
    };
    DialogFromMenu.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogFromMenu.prototype.adicionarDependente = function (nome, typeDocumentSelected, documento, clienteId, poltrona) {
        if (this.isValid()) {
            var novoDependente = { nome: nome, typeDocumentSelected: typeDocumentSelected, documento: documento, clienteId: clienteId, poltrona: poltrona };
            this.dependenteService.create({ nome: nome, typeDocumentSelected: typeDocumentSelected, documento: documento, clienteId: clienteId }).subscribe();
            this.dialogRef.close(novoDependente);
        }
    };
    DialogFromMenu.prototype.povoaDependentesOptions = function () {
        if (this.dependentes) {
            for (var _i = 0, _a = this.dependentes; _i < _a.length; _i++) {
                var dependente = _a[_i];
                this.dependentesOptions.push({ id: dependente.id, nome: dependente.nome });
            }
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
        var _this = this;
        var _a;
        var pessoa = (value === null || value === void 0 ? void 0 : value.value) || value;
        this.nome = pessoa.nome;
        if (this.dialodData.idCliente && pessoa.id) {
            this.dependentes.forEach(function (depentende) {
                if (depentende.id == pessoa.id) {
                    _this.updateDocumentSelectedHandler({ value: depentende.typeDocumentSelected, valid: true });
                    _this.updateDocumentoDependenteHandler({ value: depentende.documento, valid: true });
                }
            });
        }
        this.valid[0] = (_a = value.valid) !== null && _a !== void 0 ? _a : true;
    };
    DialogFromMenu.prototype.updateDocumentSelectedHandler = function (value) {
        this.typeDocumentSelected = value.value;
    };
    DialogFromMenu.prototype.updateDocumentoDependenteHandler = function (value) {
        if (value.value == '') {
            this.documento = 'Não informado.';
        }
        else {
            this.documento = value.value;
        }
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
                input_number_component_1.InputNumberComponent,
                input_radio_component_1.InputRadioComponent,
                input_autocomplete_data_pessoa_component_1.InputAutocompleteDataPessoaComponent,
                loading_blue_component_1.LoadingBlueComponent
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DialogFromMenu);
    return DialogFromMenu;
}());
exports.DialogFromMenu = DialogFromMenu;
