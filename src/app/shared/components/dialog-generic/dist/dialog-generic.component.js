"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogGenericComponent = void 0;
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var DialogGenericComponent = /** @class */ (function () {
    function DialogGenericComponent() {
        this.dialogRef = core_1.inject(dialog_1.MatDialogRef());
    }
    DialogGenericComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(true);
    };
    DialogGenericComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-generic',
            imports: [button_1.MatButtonModule, dialog_1.MatDialogActions, dialog_1.MatDialogClose, dialog_1.MatDialogTitle, dialog_1.MatDialogContent],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dialog-generic.component.html',
            styleUrl: './dialog-generic.component.css'
        })
    ], DialogGenericComponent);
    return DialogGenericComponent;
}());
exports.DialogGenericComponent = DialogGenericComponent;
