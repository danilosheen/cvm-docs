"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmailService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var EmailService = /** @class */ (function () {
    function EmailService(http) {
        this.http = http;
        this.apiUrl = "" + environment_1.environment.apiUrl;
    }
    EmailService.prototype.enviarEmailAniversario = function (data) {
        return this.http.post(this.apiUrl + "/pdf/feliz-aniversario", data);
    };
    EmailService.prototype.enviarEmailNotaAgradecimento = function (data) {
        return this.http.post(this.apiUrl + "/pdf/enviar-nota-agradecimento", data);
    };
    EmailService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
