"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DialogGenericComponent = void 0;
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var dialog_2 = require("@angular/material/dialog");
var DialogGenericComponent = /** @class */ (function () {
    function DialogGenericComponent(data) {
        this.data = data;
        this.dialogRef = core_1.inject(dialog_2.MatDialogRef());
    }
    DialogGenericComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(true);
    };
    DialogGenericComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-generic',
            imports: [
                button_1.MatButtonModule,
                dialog_2.MatDialogActions,
                dialog_2.MatDialogClose,
                dialog_2.MatDialogTitle,
                dialog_2.MatDialogContent
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-generic.component.html',
            styleUrl: './dialog-generic.component.css'
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogGenericComponent);
    return DialogGenericComponent;
}());
exports.DialogGenericComponent = DialogGenericComponent;
