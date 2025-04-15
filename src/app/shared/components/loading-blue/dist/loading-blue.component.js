"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoadingBlueComponent = void 0;
var core_1 = require("@angular/core");
var ngx_lottie_1 = require("ngx-lottie");
var loading_blue_json_1 = require("../../../../assets/animations/loading-blue.json");
var LoadingBlueComponent = /** @class */ (function () {
    function LoadingBlueComponent() {
        this.options = {
            animationData: loading_blue_json_1["default"],
            loop: true,
            autoplay: true
        };
    }
    LoadingBlueComponent = __decorate([
        core_1.Component({
            selector: 'app-loading-blue',
            imports: [ngx_lottie_1.LottieComponent],
            templateUrl: './loading-blue.component.html',
            styleUrl: './loading-blue.component.css'
        })
    ], LoadingBlueComponent);
    return LoadingBlueComponent;
}());
exports.LoadingBlueComponent = LoadingBlueComponent;
