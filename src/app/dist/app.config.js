"use strict";
exports.__esModule = true;
exports.appConfig = exports.playerFactory = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var async_1 = require("@angular/platform-browser/animations/async");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var auth_interceptor_service_1 = require("./core/services/authInterceptor/auth-interceptor.service");
var core_2 = require("@angular/material/core");
// Lotties
var ngx_lottie_1 = require("ngx-lottie");
var lottie_web_1 = require("lottie-web");
function playerFactory() {
    return lottie_web_1["default"];
}
exports.playerFactory = playerFactory;
exports.appConfig = {
    providers: [
        core_1.provideZoneChangeDetection({ eventCoalescing: true }),
        router_1.provideRouter(app_routes_1.routes), async_1.provideAnimationsAsync(),
        async_1.provideAnimationsAsync(),
        http_1.provideHttpClient(http_1.withFetch(), http_1.withInterceptorsFromDi()),
        animations_1.provideAnimations(),
        ngx_lottie_1.provideLottieOptions({ player: playerFactory }),
        { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_service_1.AuthInterceptorService, multi: true },
        { provide: core_2.MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ]
};
