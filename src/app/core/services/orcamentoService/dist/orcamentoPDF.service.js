"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoPDFService = void 0;
var core_1 = require("@angular/core");
var OrcamentoPDFService = /** @class */ (function () {
    // private apiUrl = 'https://backend-cvm.vercel.app/api/pdf/orcamento';
    function OrcamentoPDFService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/api/pdf/orcamento';
    }
    OrcamentoPDFService.prototype.generatePDF = function (data) {
        return this.http.post(this.apiUrl, data, { responseType: 'blob' });
    };
    OrcamentoPDFService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrcamentoPDFService);
    return OrcamentoPDFService;
}());
exports.OrcamentoPDFService = OrcamentoPDFService;
