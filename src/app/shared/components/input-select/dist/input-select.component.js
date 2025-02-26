"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputSelectComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var form_field_1 = require("@angular/material/form-field");
var InputSelectComponent = /** @class */ (function () {
    function InputSelectComponent() {
        this.errorMessage = '';
        this.listItens = [];
        this.label = '';
        this.placeholder = '';
        this.selectedInputValue = new core_1.EventEmitter();
        this.inputControl = new forms_1.FormControl(null, forms_1.Validators.required);
        this.selectFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.cidades = ['Juazeiro do Norte', 'Crato', 'Barbalha'];
    }
    InputSelectComponent.prototype.sendSelectedInputHandler = function (item) {
        this.selectedInputValue.emit({ value: item, valid: (item ? true : false) });
    };
    __decorate([
        core_1.Input()
    ], InputSelectComponent.prototype, "errorMessage");
    __decorate([
        core_1.Input()
    ], InputSelectComponent.prototype, "listItens");
    __decorate([
        core_1.Input()
    ], InputSelectComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputSelectComponent.prototype, "placeholder");
    __decorate([
        core_1.Output()
    ], InputSelectComponent.prototype, "selectedInputValue");
    InputSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-input-select',
            imports: [form_field_1.MatFormFieldModule, select_1.MatSelectModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, input_1.MatInputModule],
            templateUrl: './input-select.component.html',
            styleUrl: './input-select.component.css'
        })
    ], InputSelectComponent);
    return InputSelectComponent;
}());
exports.InputSelectComponent = InputSelectComponent;
