"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LoginService = /** @class */ (function () {
    function LoginService(http, authService) {
        this.http = http;
        this.authService = authService;
        // private apiUrl = 'http://localhost:3000/api/login';
        this.apiUrl = 'https://backend-cvm.vercel.app/api/login';
    }
    LoginService.prototype.login = function (email, senha) {
        var _this = this;
        var body = { email: email, senha: senha };
        return this.http.post(this.apiUrl, body).pipe(rxjs_1.tap(function (response) {
            if (response.token) {
                _this.authService.setToken(response.token);
            }
        }));
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
