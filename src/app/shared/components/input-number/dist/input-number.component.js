"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputNumberComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var rxjs_1 = require("rxjs");
var InputNumberComponent = /** @class */ (function () {
    function InputNumberComponent() {
        var _this = this;
        this.label = '';
        this.placeholder = '';
        this.type = '';
        this.defaultValue = '';
        this.optional = false;
        this.inputValue = new core_1.EventEmitter();
        this.errorMessage = core_1.signal('');
        this.input = new forms_1.FormControl('');
        rxjs_1.merge(this.input.statusChanges, this.input.valueChanges)
            .pipe(rxjs_interop_1.takeUntilDestroyed())
            .subscribe(function () { return _this.updateErrorMessage(); });
    }
    InputNumberComponent.prototype.ngOnInit = function () {
        if (!this.optional) {
            this.input.setValidators([forms_1.Validators.required]);
        }
        if (this.defaultValue) {
            this.input.setValue(this.defaultValue);
            this.sendNumberInputHandler(this.defaultValue);
        }
        this.setValidators();
    };
    InputNumberComponent.prototype.ngOnChanges = function (changes) {
        if (changes['defaultValue'] && changes['defaultValue'].currentValue !== undefined) {
            this.input.setValue(this.defaultValue);
            this.input.markAsPristine();
            this.input.markAsUntouched();
            this.input.updateValueAndValidity();
        }
    };
    InputNumberComponent.prototype.setValidators = function () {
        if (this.type === 'tel' && !this.optional) {
            this.input.setValidators([forms_1.Validators.required, this.phoneNumberValidator]);
        }
        else if (this.type === 'number' && !this.optional) {
            this.input.setValidators([forms_1.Validators.required, this.moneyValidator]);
        }
        else if (this.type === 'cpf' && !this.optional) {
            this.input.setValidators([forms_1.Validators.required, this.cpfValidator]);
        }
        this.input.updateValueAndValidity();
    };
    InputNumberComponent.prototype.updateErrorMessage = function () {
        if (this.input.valid) {
            this.errorMessage.set('');
            return;
        }
        if (this.input.hasError('required')) {
            this.errorMessage.set('Este campo precisa ser preenchido corretamente.');
        }
        else if (this.input.hasError('invalidPhone')) {
            this.errorMessage.set('Número de telefone inválido. Digite todos os 11 dígitos.');
        }
        else if (this.input.hasError('invalidMoney')) {
            this.errorMessage.set('O valor deve ser maior que R$ 0,00.');
        }
        else if (this.input.hasError('invalidCpf')) {
            this.errorMessage.set('O CPF digitado está incorreto');
        }
        else {
            this.errorMessage.set('Erro genérico. Verifique o campo.');
        }
    };
    InputNumberComponent.prototype.decimalFormat = function (value) {
        var numeros = value.replace(/\D/g, '');
        var numeroFormatado = parseInt(numeros, 10) || 0;
        return (numeroFormatado / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    InputNumberComponent.prototype.onPhoneInputChange = function (value) {
        var numeros = value.replace(/\D/g, '');
        if (numeros.length > 11) {
            numeros = numeros.substring(0, 11);
        }
        var formattedValue = numeros;
        if (numeros.length > 2) {
            formattedValue = "(" + numeros.substring(0, 2) + ") " + numeros.substring(2);
        }
        if (numeros.length > 7) {
            formattedValue = "(" + numeros.substring(0, 2) + ") " + numeros.substring(2, 3) + "." + numeros.substring(3, 7) + "-" + numeros.substring(7);
        }
        return formattedValue;
    };
    InputNumberComponent.prototype.onCpfFormat = function (value) {
        var numeros = value.replace(/\D/g, '');
        if (numeros.length > 11) {
            numeros = numeros.substring(0, 11);
        }
        var formattedValue = numeros;
        if (numeros.length > 3) {
            formattedValue = numeros.substring(0, 3) + "." + numeros.substring(3);
        }
        if (numeros.length > 6) {
            formattedValue = numeros.substring(0, 3) + "." + numeros.substring(3, 6) + "." + numeros.substring(6);
        }
        if (numeros.length > 9) {
            formattedValue = numeros.substring(0, 3) + "." + numeros.substring(3, 6) + "." + numeros.substring(6, 9) + "-" + numeros.substring(9);
        }
        return formattedValue;
    };
    InputNumberComponent.prototype.onInputChange = function (event) {
        if (this.type == 'number' && this.input.value) {
            var inputElement = event.target;
            var formattedValue = this.decimalFormat(inputElement.value);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendNumberInputHandler(formattedValue);
        }
        else if (this.type == 'tel' && this.input.value) {
            var inputElement = event.target;
            var formattedValue = this.onPhoneInputChange(inputElement.value);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendNumberInputHandler(formattedValue);
        }
        else if (this.type == 'cpf' && this.input.value) {
            var inputElement = event.target;
            var formattedValue = this.onCpfFormat(inputElement.value);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendNumberInputHandler(formattedValue);
        }
        else if (this.type == 'text' && this.input.value) {
            var inputElement = event.target;
            this.sendNumberInputHandler(inputElement.value);
        }
        else if (this.optional && !this.input.value) {
            this.sendNumberInputHandler("");
        }
    };
    InputNumberComponent.prototype.sendNumberInputHandler = function (valueFormated) {
        this.inputValue.emit({ value: valueFormated, valid: this.input.valid });
    };
    InputNumberComponent.prototype.moneyValidator = function (control) {
        var rawValue = control.value ? control.value.replace(/\D/g, '') : '';
        var value = parseInt(rawValue, 10) || 0;
        if (value <= 0) {
            return { invalidMoney: true };
        }
        return null;
    };
    InputNumberComponent.prototype.phoneNumberValidator = function (control) {
        var rawValue = control.value ? control.value.replace(/\D/g, '') : '';
        if (rawValue.length !== 11) {
            return { invalidPhone: true };
        }
        return null;
    };
    InputNumberComponent.prototype.cpfValidator = function (control) {
        var rawValue = control.value ? control.value.replace(/\D/g, '') : '';
        if (rawValue.length !== 11) {
            return { invalidCpf: true };
        }
        return null;
    };
    __decorate([
        core_1.Input()
    ], InputNumberComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputNumberComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], InputNumberComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], InputNumberComponent.prototype, "defaultValue");
    __decorate([
        core_1.Input()
    ], InputNumberComponent.prototype, "optional");
    __decorate([
        core_1.Output()
    ], InputNumberComponent.prototype, "inputValue");
    InputNumberComponent = __decorate([
        core_1.Component({
            selector: 'app-input-number',
            imports: [form_field_1.MatFormFieldModule, input_1.MatInputModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            templateUrl: './input-number.component.html',
            styleUrls: ['./input-number.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], InputNumberComponent);
    return InputNumberComponent;
}());
exports.InputNumberComponent = InputNumberComponent;
