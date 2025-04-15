"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputAutocompleteDataCLientComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var autocomplete_1 = require("@angular/material/autocomplete");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var common_1 = require("@angular/common");
var InputAutocompleteDataCLientComponent = /** @class */ (function () {
    function InputAutocompleteDataCLientComponent() {
        this.label = '';
        this.placeholder = '';
        this.defaultValue = '';
        this.errorMessage = '';
        this.options = [];
        this.inputValue = new core_1.EventEmitter();
        this.inputControl = new forms_1.FormControl('');
        this.filteredOptions = [];
        this.idSelected = '';
    }
    InputAutocompleteDataCLientComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['defaultValue']) {
            var selected = this.options.find(function (opt) { return opt.nome === _this.defaultValue; });
            if (selected) {
                this.inputControl.setValue(selected); // setar objeto completo
            }
            else {
                this.inputControl.setValue('');
            }
            this.inputControl.markAsPristine();
            this.inputControl.markAsUntouched();
            this.inputControl.updateValueAndValidity();
            if (!this.defaultValue) {
                this.filteredOptions = [];
            }
        }
    };
    InputAutocompleteDataCLientComponent.prototype.filter = function () {
        var value = typeof this.inputControl.value === 'string'
            ? this.inputControl.value.toLowerCase()
            : this.inputControl.value.nome.toLowerCase();
        this.filteredOptions = this.options.filter(function (option) {
            return option.nome.toLowerCase().includes(value);
        });
    };
    InputAutocompleteDataCLientComponent.prototype.displayFn = function (option) {
        var _a;
        return (_a = option === null || option === void 0 ? void 0 : option.nome) !== null && _a !== void 0 ? _a : '';
    };
    InputAutocompleteDataCLientComponent.prototype.setValue = function (optionSelecionado) {
        if (optionSelecionado === null || optionSelecionado === void 0 ? void 0 : optionSelecionado.id) {
            this.inputControl.setValue(optionSelecionado);
            this.inputValue.emit(optionSelecionado);
        }
    };
    InputAutocompleteDataCLientComponent.prototype.sendText = function () {
        var value = this.inputControl.value;
        if (typeof value === 'string') {
            this.inputValue.emit({
                value: { nome: value.trim(), id: this.idSelected },
                valid: this.inputControl.valid
            });
        }
        else if (value && typeof value === 'object') {
            this.inputValue.emit({
                value: value,
                valid: this.inputControl.valid
            });
        }
    };
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataCLientComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataCLientComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataCLientComponent.prototype, "defaultValue");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataCLientComponent.prototype, "errorMessage");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataCLientComponent.prototype, "options");
    __decorate([
        core_1.Output()
    ], InputAutocompleteDataCLientComponent.prototype, "inputValue");
    __decorate([
        core_1.ViewChild('input')
    ], InputAutocompleteDataCLientComponent.prototype, "input");
    InputAutocompleteDataCLientComponent = __decorate([
        core_1.Component({
            selector: 'app-input-autocomplete-data-client',
            imports: [
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                forms_1.ReactiveFormsModule,
                common_1.NgFor,
                common_1.NgIf
            ],
            templateUrl: './input-autocomplete-data-client.component.html',
            styleUrl: './input-autocomplete-data-client.component.css'
        })
    ], InputAutocompleteDataCLientComponent);
    return InputAutocompleteDataCLientComponent;
}());
exports.InputAutocompleteDataCLientComponent = InputAutocompleteDataCLientComponent;
