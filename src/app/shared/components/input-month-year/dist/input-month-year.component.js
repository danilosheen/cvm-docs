"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputMonthYearComponent = exports.MY_FORMATS = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var datepicker_1 = require("@angular/material/datepicker");
var _moment = require("moment");
require("moment/locale/pt-br");
var moment_1 = require("moment");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var moment = moment_1["default"] || _moment;
exports.MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY'
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
var InputMonthYearComponent = /** @class */ (function () {
    function InputMonthYearComponent() {
        this.label = '';
        this.defaultValue = '';
        this.dateSelected = new core_1.EventEmitter();
        this.date = new forms_1.FormControl(moment());
        if (this.defaultValue) {
            var dataMoment = moment(this.defaultValue, 'MM/YYYY');
            this.date.setValue(dataMoment);
        }
    }
    InputMonthYearComponent.prototype.setMonthAndYear = function (normalizedMonthAndYear, datepicker) {
        var _a;
        var ctrlValue = (_a = this.date.value) !== null && _a !== void 0 ? _a : moment();
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
        this.dateSelected.emit(this.date.value);
    };
    __decorate([
        core_1.Input()
    ], InputMonthYearComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputMonthYearComponent.prototype, "defaultValue");
    __decorate([
        core_1.Output()
    ], InputMonthYearComponent.prototype, "dateSelected");
    InputMonthYearComponent = __decorate([
        core_1.Component({
            selector: 'app-input-month-year',
            imports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                datepicker_1.MatDatepickerModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [
                material_moment_adapter_1.provideMomentDateAdapter(exports.MY_FORMATS),
                { provide: core_1.LOCALE_ID, useValue: 'pt-BR' },
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'pt-BR' },
                { provide: material_moment_adapter_1.MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
            ],
            templateUrl: './input-month-year.component.html',
            styleUrl: './input-month-year.component.css'
        })
    ], InputMonthYearComponent);
    return InputMonthYearComponent;
}());
exports.InputMonthYearComponent = InputMonthYearComponent;
