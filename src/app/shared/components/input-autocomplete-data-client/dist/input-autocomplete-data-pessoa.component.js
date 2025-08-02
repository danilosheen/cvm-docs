"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputAutocompleteDataPessoaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var autocomplete_1 = require("@angular/material/autocomplete");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var common_1 = require("@angular/common");
var InputAutocompleteDataPessoaComponent = /** @class */ (function () {
    function InputAutocompleteDataPessoaComponent() {
        this.label = '';
        this.placeholder = '';
        this.defaultValue = '';
        this.errorMessage = '';
        this.options = [];
        this.inputValue = new core_1.EventEmitter();
        this.inputControl = new forms_1.FormControl('');
        this.filteredOptions = [];
    }
    InputAutocompleteDataPessoaComponent.prototype.ngOnChanges = function (changes) {
        if (changes['defaultValue']) {
            if (this.defaultValue == '') {
                this.inputControl.setValue('');
                this.filteredOptions = [];
                this.inputControl.markAsPristine();
                this.inputControl.markAsUntouched();
                this.inputControl.updateValueAndValidity();
            }
        }
    };
    InputAutocompleteDataPessoaComponent.prototype.ngOnInit = function () {
        this.setInitialValue(this.defaultValue);
    };
    InputAutocompleteDataPessoaComponent.prototype.setInitialValue = function (value) {
        if (value) {
            var matchedOption = this.options.find(function (opt) { return opt.nome === value; });
            this.inputControl.setValue(matchedOption || value);
            this.inputValue.emit({
                value: matchedOption || { nome: value.trim(), id: '' },
                valid: this.inputControl.valid
            });
        }
        else {
            this.inputControl.setValue('');
            this.filteredOptions = [];
        }
        this.inputControl.markAsPristine();
        this.inputControl.markAsUntouched();
        this.inputControl.updateValueAndValidity();
    };
    InputAutocompleteDataPessoaComponent.prototype.filter = function () {
        var _a;
        var value = typeof this.inputControl.value === 'string'
            ? this.inputControl.value.toLowerCase()
            : (_a = this.inputControl.value) === null || _a === void 0 ? void 0 : _a.nome.toLowerCase();
        this.filteredOptions = this.options.filter(function (option) {
            return option.nome.toLowerCase().includes(value || '');
        });
    };
    InputAutocompleteDataPessoaComponent.prototype.displayFn = function (value) {
        var _a;
        if (typeof value === 'string')
            return value;
        return (_a = value === null || value === void 0 ? void 0 : value.nome) !== null && _a !== void 0 ? _a : '';
    };
    InputAutocompleteDataPessoaComponent.prototype.setValue = function (optionSelecionado) {
        this.inputControl.setValue(optionSelecionado);
        this.inputValue.emit({
            value: optionSelecionado,
            valid: this.inputControl.valid
        });
    };
    InputAutocompleteDataPessoaComponent.prototype.sendText = function () {
        var value = this.inputControl.value;
        if (typeof value === 'string') {
            this.inputValue.emit({
                value: { nome: value.trim(), id: '' },
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
    ], InputAutocompleteDataPessoaComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataPessoaComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataPessoaComponent.prototype, "defaultValue");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataPessoaComponent.prototype, "errorMessage");
    __decorate([
        core_1.Input()
    ], InputAutocompleteDataPessoaComponent.prototype, "options");
    __decorate([
        core_1.Output()
    ], InputAutocompleteDataPessoaComponent.prototype, "inputValue");
    __decorate([
        core_1.ViewChild('input')
    ], InputAutocompleteDataPessoaComponent.prototype, "input");
    InputAutocompleteDataPessoaComponent = __decorate([
        core_1.Component({
            selector: 'app-input-autocomplete-data-pessoa',
            standalone: true,
            imports: [
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                autocomplete_1.MatAutocompleteModule,
                forms_1.ReactiveFormsModule,
                common_1.NgFor,
                common_1.NgIf
            ],
            templateUrl: './input-autocomplete-data-pessoa.component.html',
            styleUrl: './input-autocomplete-data-pessoa.component.css'
        })
    ], InputAutocompleteDataPessoaComponent);
    return InputAutocompleteDataPessoaComponent;
}());
exports.InputAutocompleteDataPessoaComponent = InputAutocompleteDataPessoaComponent;
