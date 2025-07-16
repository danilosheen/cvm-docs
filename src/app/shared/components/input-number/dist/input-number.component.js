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
        this.defaultValue = null;
        this.optional = false;
        this.inputValueString = new core_1.EventEmitter();
        this.inputValueNumber = new core_1.EventEmitter();
        this.errorMessage = core_1.signal('');
        this.input = new forms_1.FormControl('');
        rxjs_1.merge(this.input.statusChanges, this.input.valueChanges)
            .pipe(rxjs_interop_1.takeUntilDestroyed())
            .subscribe(function () { return _this.updateErrorMessage(); });
        if (this.defaultValue) {
            this.input.setValue(this.defaultValue);
        }
    }
    InputNumberComponent.prototype.ngOnInit = function () {
        if (!this.optional) {
            this.input.setValidators([forms_1.Validators.required]);
        }
        if (this.defaultValue) {
            if (this.type == 'number') {
                // Formata para BRL sem símbolo
                var formatted = this.defaultValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                this.input.setValue(formatted);
                this.sendInputHandler(this.defaultValue);
            }
            else {
                this.input.setValue(this.defaultValue);
                this.sendInputHandler(this.defaultValue);
            }
        }
        this.setValidators();
    };
    InputNumberComponent.prototype.ngOnChanges = function (changes) {
        if (changes['defaultValue'] && changes['defaultValue'].currentValue !== undefined) {
            if (this.type == 'number' && this.defaultValue) {
                // Formata para BRL sem símbolo
                var formatted = this.defaultValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                this.input.setValue(formatted);
            }
            else {
                this.input.setValue(this.defaultValue);
            }
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
        else if (this.type === 'cnpj' && !this.optional) {
            this.input.setValidators([forms_1.Validators.required, this.cnpjValidator]);
        }
        else if (this.type === 'date' && !this.optional) {
            this.input.setValidators([forms_1.Validators.required, this.dateValidator]);
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
        // Permite o sinal negativo no início
        var isNegative = value.trim().startsWith('-');
        var numeros = value.replace(/[^0-9]/g, '');
        var numeroFormatado = parseInt(numeros, 10) || 0;
        var resultado = (numeroFormatado / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return isNegative ? "-" + resultado : resultado;
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
    InputNumberComponent.prototype.onCnpjFormat = function (value) {
        var numeros = value.replace(/\D/g, '');
        if (numeros.length > 14) {
            numeros = numeros.substring(0, 14);
        }
        var formattedValue = numeros;
        if (numeros.length > 2) {
            formattedValue = numeros.substring(0, 2) + "." + numeros.substring(2);
        }
        if (numeros.length > 5) {
            formattedValue = numeros.substring(0, 2) + "." + numeros.substring(2, 5) + "." + numeros.substring(5);
        }
        if (numeros.length > 8) {
            formattedValue = numeros.substring(0, 2) + "." + numeros.substring(2, 5) + "." + numeros.substring(5, 8) + "/" + numeros.substring(8);
        }
        if (numeros.length > 12) {
            formattedValue = numeros.substring(0, 2) + "." + numeros.substring(2, 5) + "." + numeros.substring(5, 8) + "/" + numeros.substring(8, 12) + "-" + numeros.substring(12);
        }
        return formattedValue;
    };
    InputNumberComponent.prototype.onDateFormat = function (value) {
        var numeros = value.replace(/\D/g, '');
        if (numeros.length > 8) {
            numeros = numeros.substring(0, 8);
        }
        var formattedValue = numeros;
        if (numeros.length > 4) {
            formattedValue = numeros.substring(0, 2) + "/" + numeros.substring(2, 4) + "/" + numeros.substring(4);
        }
        else if (numeros.length > 2) {
            formattedValue = numeros.substring(0, 2) + "/" + numeros.substring(2);
        }
        return formattedValue;
    };
    InputNumberComponent.prototype.onInputChange = function (event) {
        var inputElement = event.target;
        var rawValue = inputElement.value;
        if (this.type === 'number' && rawValue) {
            if (rawValue.trim() === '-') {
                this.input.setValue('0,00', { emitEvent: false });
                this.sendInputHandler(0);
                return;
            }
            // Remove tudo que não é número ou "-"
            var onlyDigits = rawValue.replace(/[^\d-]/g, '');
            // Verifica se há "-" no final (ou em qualquer lugar)
            var isNegative = onlyDigits.includes('-');
            // Remove o "-" para processar só os dígitos
            onlyDigits = onlyDigits.replace(/-/g, '');
            // Converte para centavos
            var numericValue = parseFloat(onlyDigits) / 100;
            if (isNegative) {
                numericValue = numericValue * -1;
            }
            if (Object.is(numericValue, -0)) {
                numericValue = 0;
            }
            // Formata para BRL sem símbolo
            var formatted = numericValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            // Atualiza visualmente
            this.input.setValue(formatted, { emitEvent: false });
            this.sendInputHandler(numericValue);
        }
        else if (this.type === 'tel' && rawValue) {
            var formattedValue = this.onPhoneInputChange(rawValue);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendInputHandler(formattedValue);
        }
        else if (this.type === 'cpf' && rawValue) {
            var formattedValue = this.onCpfFormat(rawValue);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendInputHandler(formattedValue);
        }
        else if (this.type === 'cnpj' && rawValue) {
            var formattedValue = this.onCnpjFormat(rawValue);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendInputHandler(formattedValue);
        }
        else if (this.type === 'date' && rawValue) {
            var formattedValue = this.onDateFormat(rawValue);
            this.input.setValue(formattedValue, { emitEvent: false });
            this.sendInputHandler(formattedValue);
        }
        else if (this.type === 'text' && rawValue) {
            this.sendInputHandler(parseInt(rawValue));
        }
        else if (this.optional && !rawValue) {
            this.sendInputHandler('');
        }
    };
    InputNumberComponent.prototype.sendInputHandler = function (valueInputed) {
        var payload = { value: valueInputed, valid: this.input.valid };
        if (typeof valueInputed === 'number') {
            this.inputValueNumber.emit(payload);
        }
        else {
            this.inputValueString.emit(payload);
        }
    };
    InputNumberComponent.prototype.moneyValidator = function (control) {
        var _a;
        var raw = (_a = control.value) !== null && _a !== void 0 ? _a : '';
        var isNegative = String(raw).trim().startsWith('-');
        var rawValue = String(raw).replace(/[^0-9]/g, '');
        var value = parseInt(rawValue, 10) || 0;
        var signedValue = isNegative ? -value : value;
        // Se quiser permitir valores negativos e positivos, apenas rejeitar zero:
        if (signedValue === 0) {
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
    InputNumberComponent.prototype.cnpjValidator = function (control) {
        var rawValue = control.value ? control.value.replace(/\D/g, '') : '';
        if (rawValue.length !== 14) {
            return { invalidCnpj: true };
        }
        return null;
    };
    InputNumberComponent.prototype.dateValidator = function (control) {
        var rawValue = control.value ? control.value.replace(/\D/g, '') : '';
        if (rawValue.length !== 8) {
            return { invalidDate: true };
        }
        var day = parseInt(rawValue.substring(0, 2), 10);
        var month = parseInt(rawValue.substring(2, 4), 10);
        var year = parseInt(rawValue.substring(4), 10);
        var date = new Date(year, month - 1, day);
        var isValidDate = date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;
        if (!isValidDate) {
            return { invalidDate: true };
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
    ], InputNumberComponent.prototype, "inputValueString");
    __decorate([
        core_1.Output()
    ], InputNumberComponent.prototype, "inputValueNumber");
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
