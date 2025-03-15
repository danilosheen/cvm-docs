"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputAutocompleteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var autocomplete_1 = require("@angular/material/autocomplete");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var InputAutocompleteComponent = /** @class */ (function () {
    function InputAutocompleteComponent() {
        this.label = '';
        this.placeholder = '';
        this.errorMessage = '';
        this.options = [];
        this.inputValue = new core_1.EventEmitter();
        this.inputControl = new forms_1.FormControl('');
        this.filteredOptions = this.options.slice();
    }
    InputAutocompleteComponent.prototype.filter = function () {
        var filterValue = this.input.nativeElement.value.toLowerCase();
        this.filteredOptions = this.options.filter(function (o) { return o.toLowerCase().includes(filterValue); });
    };
    InputAutocompleteComponent.prototype.sendText = function () {
        if (this.inputControl.value) {
            this.inputValue.emit({ value: this.inputControl.value, valid: this.inputControl.valid });
        }
    };
    __decorate([
        core_1.Input()
    ], InputAutocompleteComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputAutocompleteComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], InputAutocompleteComponent.prototype, "errorMessage");
    __decorate([
        core_1.Input()
    ], InputAutocompleteComponent.prototype, "options");
    __decorate([
        core_1.Output()
    ], InputAutocompleteComponent.prototype, "inputValue");
    __decorate([
        core_1.ViewChild('input')
    ], InputAutocompleteComponent.prototype, "input");
    InputAutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'app-input-autocomplete',
            imports: [
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                forms_1.ReactiveFormsModule,
            ],
            templateUrl: './input-autocomplete.component.html',
            styleUrl: './input-autocomplete.component.css'
        })
    ], InputAutocompleteComponent);
    return InputAutocompleteComponent;
}());
exports.InputAutocompleteComponent = InputAutocompleteComponent;
