"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogSaldoComponent = void 0;
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var dialog_2 = require("@angular/material/dialog");
var input_number_component_1 = require("../input-number/input-number.component");
var br_currency_pipe_1 = require("../../../pipes/br-currency.pipe");
var DialogSaldoComponent = /** @class */ (function () {
    function DialogSaldoComponent() {
        this.dialogRef = core_1.inject(dialog_2.MatDialogRef());
        this.valueInputed = '0,00';
        this.data = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        if (this.data.saldoAnterior) {
            this.valueInputed = this.data.saldoAnterior;
        }
    }
    DialogSaldoComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(this.valueInputed);
    };
    DialogSaldoComponent.prototype.updateValueHandler = function (value) {
        this.valueInputed = value.value;
    };
    DialogSaldoComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-saldo',
            imports: [
                button_1.MatButtonModule,
                dialog_2.MatDialogActions,
                dialog_2.MatDialogClose,
                dialog_2.MatDialogTitle,
                input_number_component_1.InputNumberComponent,
                br_currency_pipe_1.BrCurrencyPipe
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-saldo.component.html',
            styleUrl: './dialog-saldo.component.css'
        })
    ], DialogSaldoComponent);
    return DialogSaldoComponent;
}());
exports.DialogSaldoComponent = DialogSaldoComponent;
