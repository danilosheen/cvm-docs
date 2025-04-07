"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ButtonCardComponent = void 0;
var core_1 = require("@angular/core");
var ButtonCardComponent = /** @class */ (function () {
    function ButtonCardComponent() {
        this.icon = 'https://www.flaticon.com/br/icones-gratis/custo';
        this.title = 'Criar orçamento';
        this.description = 'Preencha os campos e gere um arquivo PDF no modelo da CVM Turismo.';
        this.buttonClicked = new core_1.EventEmitter();
    }
    ButtonCardComponent.prototype.clickHandler = function () {
        this.buttonClicked.emit();
    };
    __decorate([
        core_1.Input()
    ], ButtonCardComponent.prototype, "icon");
    __decorate([
        core_1.Input()
    ], ButtonCardComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], ButtonCardComponent.prototype, "description");
    __decorate([
        core_1.Output()
    ], ButtonCardComponent.prototype, "buttonClicked");
    ButtonCardComponent = __decorate([
        core_1.Component({
            selector: 'app-button-card',
            imports: [],
            templateUrl: './button-card.component.html',
            styleUrl: './button-card.component.css'
        })
    ], ButtonCardComponent);
    return ButtonCardComponent;
}());
exports.ButtonCardComponent = ButtonCardComponent;
