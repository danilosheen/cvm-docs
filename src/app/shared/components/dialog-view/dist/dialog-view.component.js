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
var DialogViewComponent = /** @class */ (function () {
    function DialogViewComponent() {
        this.dialogRef = core_1.inject(dialog_2.MatDialogRef());
        this.data = core_1.inject(dialog_1.MAT_DIALOG_DATA);
        this.datePipe = core_1.inject(common_1.DatePipe);
        this.updatedAt = this.datePipe.transform(this.data.updatedAt, "dd/MM/yyyy 'às' HH:mm:ss");
        console.log(this.data);
    }
    DialogViewComponent.prototype.onClickHandler = function () {
        this.dialogRef.close(true);
    };
    DialogViewComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-view',
            imports: [
                button_1.MatButtonModule,
                dialog_2.MatDialogActions,
                dialog_2.MatDialogClose
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
