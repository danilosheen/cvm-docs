"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptorService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(router) {
        this.router = router;
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var token = localStorage.getItem('authToken');
        var authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: { Authorization: "Bearer " + token }
            });
        }
        return next.handle(authReq).pipe(operators_1.catchError(function (error) {
            if (error.status === 401) {
                localStorage.removeItem('authToken');
                alert("Sua sessão expirou, faça login novamente!");
                _this.router.navigate(['/']);
            }
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    AuthInterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());
exports.AuthInterceptorService = AuthInterceptorService;
