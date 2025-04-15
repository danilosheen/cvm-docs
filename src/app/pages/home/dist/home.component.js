"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var icon_1 = require("@angular/material/icon");
var divider_1 = require("@angular/material/divider");
var button_1 = require("@angular/material/button");
var router_1 = require("@angular/router");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var button_card_component_1 = require("../../shared/components/button-card/button-card.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        if (!this.authService.getToken()) {
            this.router.navigate(["/"]);
        }
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            imports: [
                router_1.RouterLink,
                navbar_component_1.NavbarComponent,
                icon_1.MatIconModule,
                divider_1.MatDividerModule,
                button_1.MatButtonModule,
                footer_component_1.FooterComponent,
                button_card_component_1.ButtonCardComponent
            ],
            templateUrl: './home.component.html',
            styleUrl: './home.component.css'
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
