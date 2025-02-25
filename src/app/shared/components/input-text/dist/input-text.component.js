"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InputTextComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var rxjs_1 = require("rxjs");
var InputTextComponent = /** @class */ (function () {
    function InputTextComponent() {
        var _this = this;
        this.label = '';
        this.placeholder = '';
        this.formControlName = '';
        this.inputValue = new core_1.EventEmitter();
        this.input = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.errorMessage = core_1.signal('');
        rxjs_1.merge(this.input.statusChanges, this.input.valueChanges)
            .pipe(rxjs_interop_1.takeUntilDestroyed())
            .subscribe(function () { return _this.updateErrorMessage(); });
    }
    InputTextComponent.prototype.updateErrorMessage = function () {
        if (this.input.hasError('required')) {
            this.errorMessage.set('Este campo não pode ser vazio.');
        }
        else {
            this.errorMessage.set('');
        }
    };
    InputTextComponent.prototype.sendTextInputHandler = function () {
        //envia output
        this.inputValue.emit(this.input.value || "");
        // console.log(this.input);
    };
    __decorate([
        core_1.Input()
    ], InputTextComponent.prototype, "label");
    __decorate([
        core_1.Input()
    ], InputTextComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], InputTextComponent.prototype, "formControlName");
    __decorate([
        core_1.Output()
    ], InputTextComponent.prototype, "inputValue");
    InputTextComponent = __decorate([
        core_1.Component({
            selector: 'app-input-text',
            imports: [form_field_1.MatFormFieldModule, input_1.MatInputModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            templateUrl: './input-text.component.html',
            styleUrl: './input-text.component.css',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], InputTextComponent);
    return InputTextComponent;
}());
exports.InputTextComponent = InputTextComponent;
