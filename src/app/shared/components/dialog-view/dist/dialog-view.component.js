"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogViewComponent = void 0;
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var dialog_2 = require("@angular/material/dialog");
var common_1 = require("@angular/common");
var dependente_service_service_1 = require("../../../core/services/dependenteService/dependente-service.service");
var tooltip_1 = require("@angular/material/tooltip");
var DialogViewComponent = /** @class */ (function () {
    function DialogViewComponent() {
        var _this = this;
        var _a, _b;
        this.dialogRef = core_1.inject(dialog_2.MatDialogRef());
        this.inputsData = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        this.type = this.inputsData.type;
        this.data = this.inputsData.pessoa;
        this.datePipe = core_1.inject(common_1.DatePipe);
        this.updatedAt = (_a = this.datePipe.transform(this.data.updatedAt, "dd/MM/yyyy 'às' HH:mm:ss")) !== null && _a !== void 0 ? _a : '';
        this.ultimaViagem = (_b = this.datePipe.transform(this.data.ultimaViagem, "dd/MM/yyyy")) !== null && _b !== void 0 ? _b : '';
        this.dependenteService = core_1.inject(dependente_service_service_1.DependenteService);
        this.dependentes = [];
        this.showDependentes = false;
        if (this.type == 'cliente') {
            this.dependenteService.getAll(this.data.id).subscribe(function (dependentes) {
                _this.dependentes = dependentes;
            });
        }
    }
    DialogViewComponent.prototype.toggleExibeDependentes = function () {
        if (this.dependentes.length > 0) {
            this.showDependentes = !this.showDependentes;
        }
    };
    DialogViewComponent.prototype.removerDependente = function (dependenteID, index) {
        this.dependenteService["delete"](dependenteID).subscribe();
        this.dependentes.splice(index, 1);
    };
    DialogViewComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(true);
    };
    DialogViewComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-view',
            imports: [
                button_1.MatButtonModule,
                dialog_2.MatDialogActions,
                dialog_2.MatDialogClose,
                tooltip_1.MatTooltipModule
            ],
            providers: [common_1.DatePipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-view.component.html',
            styleUrl: './dialog-view.component.css'
        })
    ], DialogViewComponent);
    return DialogViewComponent;
}());
exports.DialogViewComponent = DialogViewComponent;
