"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputCheckboxComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var checkbox_1 = require("@angular/material/checkbox");
var expansion_1 = require("@angular/material/expansion");
var InputCheckboxComponent = /** @class */ (function () {
    function InputCheckboxComponent() {
        this.label = '';
        this.type = '';
        this._formBuilder = core_1.inject(forms_1.FormBuilder);
        this.panelOpenState = core_1.signal(false);
        this.servicos = this._formBuilder.group({
            cafeDaManha: false,
            almoco: false,
            jantar: false,
            roteiro: false
        });
    }
    __decorate([
        core_1.Input()
    ], InputCheckboxComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputCheckboxComponent.prototype, "type");
    InputCheckboxComponent = __decorate([
        core_1.Component({
            selector: 'app-input-checkbox',
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                checkbox_1.MatCheckboxModule,
                expansion_1.MatExpansionModule
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './input-checkbox.component.html',
            styleUrl: './input-checkbox.component.css'
        })
    ], InputCheckboxComponent);
    return InputCheckboxComponent;
}());
exports.InputCheckboxComponent = InputCheckboxComponent;
