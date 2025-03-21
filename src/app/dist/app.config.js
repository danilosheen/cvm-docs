"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var async_1 = require("@angular/platform-browser/animations/async");
var http_1 = require("@angular/common/http");
exports.appConfig = {
    providers: [
        core_1.provideZoneChangeDetection({ eventCoalescing: true }),
        router_1.provideRouter(app_routes_1.routes), async_1.provideAnimationsAsync(),
        async_1.provideAnimationsAsync(),
        http_1.provideHttpClient(http_1.withFetch())
    ]
};
