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
var loading_component_1 = require("../../shared/components/loading/loading.component");
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
        this.isLoading = false;
        if (this.authService.getToken()) {
            this.router.navigate(["/home"]);
        }
        var email = localStorage.getItem("email");
        if (email) {
            this.email = email;
        }
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        this.loginService.login(this.email, this.senha).subscribe({
            next: function (result) {
                if (result.token) {
                    localStorage.setItem("email", _this.email);
                    _this.router.navigate(["/home"]);
                    _this.isLoading = false;
                }
            },
            error: function (error) {
                _this.isLoading = false;
                _this.errorMessage = error.error.error.toLowerCase();
                setTimeout(function () {
                    _this.errorMessage = '';
                }, 5000);
            }
        });
    };
    LoginComponent.prototype.togglePassword = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
    };
    LoginComponent.prototype.onEnterPress = function (event) {
        this.login();
    };
    LoginComponent.prototype.showErro = function () {
        if (this.errorMessage) {
            return true;
        }
        return false;
    };
    __decorate([
        core_1.HostListener('document:keydown.enter', ['$event'])
    ], LoginComponent.prototype, "onEnterPress");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.ReactiveFormsModule,
                common_1.NgClass,
                loading_component_1.LoadingComponent,
                common_1.NgIf
            ],
            templateUrl: './login.component.html',
            styleUrl: './login.component.css'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
