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
        this.inputValue = new core_1.EventEmitter();
        this.input = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.errorMessage = core_1.signal('');
        rxjs_1.merge(this.input.statusChanges, this.input.valueChanges)
            .pipe(rxjs_interop_1.takeUntilDestroyed())
            .subscribe(function () { return _this.updateErrorMessage(); });
    }
    InputNumberComponent.prototype.updateErrorMessage = function () {
        if (this.input.hasError('required')) {
            this.errorMessage.set('Este campo não pode ser vazio.');
        }
        else {
            this.errorMessage.set('');
        }
    };
    InputNumberComponent.prototype.sendNumberInputHandler = function () {
        //envia output
        this.inputValue.emit(this.input.value || "");
        // console.log(this.input);
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
        core_1.Output()
    ], InputNumberComponent.prototype, "inputValue");
    InputNumberComponent = __decorate([
        core_1.Component({
            selector: 'app-input-number',
            imports: [form_field_1.MatFormFieldModule, input_1.MatInputModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            templateUrl: './input-number.component.html',
            styleUrl: './input-number.component.css',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], InputNumberComponent);
    return InputNumberComponent;
}());
exports.InputNumberComponent = InputNumberComponent;
