"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var common_1 = require("@angular/common");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, router, authService) {
        this.loginService = loginService;
        this.router = router;
        this.authService = authService;
        this.email = '';
        this.senha = '';
        this.token = '';
        this.errorMessage = '';
        this.typePassword = 'password';
        if (this.authService.getToken()) {
            this.router.navigate(["/home"]);
        }
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.email, this.senha).subscribe({
            next: function (result) {
                if (result.token) {
                    _this.router.navigate(["/home"]);
                }
            },
            error: function (error) {
                _this.errorMessage = error.error.error.toLowerCase();
                setTimeout(function () {
                    _this.errorMessage = '';
                }, 5000);
            }
        });
    };
    LoginComponent.prototype.togglePassword = function (event) {
        event.stopImmediatePropagation();
        this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
    };
    LoginComponent.prototype.showErro = function () {
        if (this.errorMessage) {
            return true;
        }
        return false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.ReactiveFormsModule,
                common_1.NgClass
            ],
            templateUrl: './login.component.html',
            styleUrl: './login.component.css'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
