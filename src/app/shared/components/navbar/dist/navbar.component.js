"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialog_1 = require("@angular/material/dialog");
var dialog_generic_component_1 = require("../dialog-generic/dialog-generic.component");
var button_1 = require("@angular/material/button");
var menu_1 = require("@angular/material/menu");
var icon_1 = require("@angular/material/icon");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.dialog = core_1.inject(dialog_1.MatDialog);
    }
    NavbarComponent.prototype.openDialog = function (enterAnimationDuration, exitAnimationDuration) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            width: '250px',
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                dialogTitle: 'Sair',
                dialogContent: 'Você tem certeza que deseja sair?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.logout();
            }
        });
    };
    NavbarComponent.prototype.abrirTelaOrcamentoHistory = function () {
        this.router.navigate(['/orcamento-history']);
    };
    NavbarComponent.prototype.logout = function () {
        this.authService.removeToken();
        this.router.navigate(["/"]);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            imports: [
                router_1.RouterLink,
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
                icon_1.MatIconModule
            ],
            templateUrl: './navbar.component.html',
            styleUrl: './navbar.component.css'
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
