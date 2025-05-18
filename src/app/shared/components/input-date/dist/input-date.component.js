"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputDateComponent = void 0;
var core_1 = require("@angular/core");
var datepicker_1 = require("@angular/material/datepicker");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var formats_1 = require("./formats");
var InputDateComponent = /** @class */ (function () {
    function InputDateComponent() {
        var _this = this;
        this.label = '';
        this.optional = false;
        this.defaultValue = '';
        this.inputDate = new core_1.EventEmitter();
        this.input = new forms_1.FormControl('');
        this.errorMessage = core_1.signal('');
        this.input.valueChanges.subscribe(function () { return _this.updateErrorMessage(); });
    }
    InputDateComponent.prototype.ngOnInit = function () {
        if (!this.optional) {
            this.input.setValidators([forms_1.Validators.required]);
        }
        if (this.defaultValue) {
            this.input.setValue(this.defaultValue);
            console.log(this.defaultValue);
        }
    };
    InputDateComponent.prototype.updateErrorMessage = function () {
        if (this.input.hasError('required')) {
            this.errorMessage.set('Este campo não pode ser vazio.');
        }
        else {
            this.errorMessage.set('Preencha o campo corretamente.');
        }
    };
    InputDateComponent.prototype.onDatepickerClose = function () {
        if (this.input.value) {
            this.sendDataSaidaInputHandler();
        }
    };
    InputDateComponent.prototype.sendDataSaidaInputHandler = function () {
        //envia output
        // const dataSaida = new Date(this.input.value);
        // // Formata a data para dd/mm/yyyy
        // const dia = String(dataSaida.getDate()).padStart(2, "0");
        // const mes = String(dataSaida.getMonth() + 1).padStart(2, "0"); // Meses começam do 0
        // const ano = dataSaida.getFullYear();
        // const dataFormatada = `${dia}/${mes}/${ano}`;
        console.log(this.input.value);
        this.inputDate.emit({ value: this.input.value, valid: this.input.valid });
    };
    __decorate([
        core_1.Input()
    ], InputDateComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputDateComponent.prototype, "optional");
    __decorate([
        core_1.Input()
    ], InputDateComponent.prototype, "defaultValue");
    __decorate([
        core_1.Output()
    ], InputDateComponent.prototype, "inputDate");
    InputDateComponent = __decorate([
        core_1.Component({
            selector: 'app-input-date',
            standalone: true,
            imports: [form_field_1.MatFormFieldModule, input_1.MatInputModule, datepicker_1.MatDatepickerModule, forms_1.ReactiveFormsModule, common_1.NgIf],
            providers: [
                core_2.provideNativeDateAdapter(),
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'pt-BR' },
                { provide: core_2.MAT_DATE_FORMATS, useValue: formats_1.MY_FORMATS }
            ],
            templateUrl: './input-date.component.html',
            styleUrl: './input-date.component.css',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], InputDateComponent);
    return InputDateComponent;
}());
exports.InputDateComponent = InputDateComponent;
