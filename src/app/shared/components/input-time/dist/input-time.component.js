"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputTimeComponent = void 0;
var core_1 = require("@angular/core");
var timepicker_1 = require("@angular/material/timepicker");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var InputTimeComponent = /** @class */ (function () {
    function InputTimeComponent() {
        var _this = this;
        this.label = '';
        this.defaultValue = '';
        this.inputTime = new core_1.EventEmitter();
        this.errorMessage = core_1.signal('');
        var initialValue = new Date();
        initialValue.setHours(6, 30, 0, 0);
        this.input = new forms_1.FormControl(initialValue);
        this.input.valueChanges.subscribe(function () { return _this.updateErrorMessage(); });
        this.input.valueChanges.subscribe(function () { return _this.sendDataSaidaInputHandler(); });
    }
    InputTimeComponent.prototype.ngOnInit = function () {
        if (this.defaultValue) {
            var initialValue = new Date();
            var horas = parseFloat(this.defaultValue.slice(0, 2));
            var minutos = parseFloat(this.defaultValue.slice(3, 5));
            initialValue.setHours(horas, minutos, 0, 0);
            this.input.setValue(initialValue);
            this.inputTime.emit({ value: this.defaultValue, valid: this.input.valid });
        }
    };
    InputTimeComponent.prototype.updateErrorMessage = function () {
        if (this.input.hasError('required')) {
            this.errorMessage.set('Este campo não pode ser vazio.');
        }
        else {
            this.errorMessage.set('Preencha o campo corretamente.');
        }
    };
    InputTimeComponent.prototype.sendDataSaidaInputHandler = function () {
        var horaSaida = this.input.value;
        if (horaSaida) {
            // Formata a data para hh:mm
            var horas = String(horaSaida.getHours()).padStart(2, "0");
            var minutos = String(horaSaida.getMinutes()).padStart(2, "0");
            var horaFormatada = horas + ":" + minutos;
            this.inputTime.emit({ value: horaFormatada, valid: this.input.valid });
        }
        else {
            console.error("Valor de horaSaida é nulo");
            this.inputTime.emit("");
        }
    };
    __decorate([
        core_1.Input()
    ], InputTimeComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputTimeComponent.prototype, "defaultValue");
    __decorate([
        core_1.Output()
    ], InputTimeComponent.prototype, "inputTime");
    InputTimeComponent = __decorate([
        core_1.Component({
            selector: 'app-input-time',
            imports: [form_field_1.MatFormFieldModule, input_1.MatInputModule, timepicker_1.MatTimepickerModule, forms_1.ReactiveFormsModule, common_1.NgIf],
            providers: [
                core_2.provideNativeDateAdapter(),
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'pt-BR' },
            ],
            templateUrl: './input-time.component.html',
            styleUrl: './input-time.component.css'
        })
    ], InputTimeComponent);
    return InputTimeComponent;
}());
exports.InputTimeComponent = InputTimeComponent;
