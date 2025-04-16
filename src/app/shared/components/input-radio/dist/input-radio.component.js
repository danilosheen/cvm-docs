"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputRadioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var expansion_1 = require("@angular/material/expansion");
var radio_1 = require("@angular/material/radio");
var InputRadioComponent = /** @class */ (function () {
    function InputRadioComponent() {
        this.label = '';
        this.listItems = [];
        this.defaultValue = '';
        this.expanded = false;
        this.dropdown = true;
        this.selectedValue = new core_1.EventEmitter();
        this.radioChanged = new core_1.EventEmitter();
    }
    InputRadioComponent.prototype.onSelectionChange = function (item) {
        if (item) {
            this.selectedValue.emit({ value: item, valid: true });
        }
    };
    __decorate([
        core_1.Input()
    ], InputRadioComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputRadioComponent.prototype, "listItems");
    __decorate([
        core_1.Input()
    ], InputRadioComponent.prototype, "defaultValue");
    __decorate([
        core_1.Input()
    ], InputRadioComponent.prototype, "expanded");
    __decorate([
        core_1.Input()
    ], InputRadioComponent.prototype, "dropdown");
    __decorate([
        core_1.Output()
    ], InputRadioComponent.prototype, "selectedValue");
    __decorate([
        core_1.Output()
    ], InputRadioComponent.prototype, "radioChanged");
    InputRadioComponent = __decorate([
        core_1.Component({
            selector: 'app-input-radio',
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                expansion_1.MatExpansionModule,
                radio_1.MatRadioModule
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './input-radio.component.html',
            styleUrl: './input-radio.component.css'
        })
    ], InputRadioComponent);
    return InputRadioComponent;
}());
exports.InputRadioComponent = InputRadioComponent;
