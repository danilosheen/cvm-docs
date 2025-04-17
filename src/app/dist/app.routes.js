"use strict";
exports.__esModule = true;
exports.routes = void 0;
var login_component_1 = require("./pages/login/login.component");
var home_component_1 = require("./pages/home/home.component");
var ficha_excursao_component_1 = require("./pages/ficha-excursao/ficha-excursao.component");
var contrato_component_1 = require("./pages/contrato/contrato.component");
var recibo_component_1 = require("./pages/recibo/recibo.component");
var orcamento_component_1 = require("./pages/orcamento/orcamento.component");
var lista_passageiros_component_1 = require("./pages/lista-passageiros/lista-passageiros.component");
var clientes_component_1 = require("./pages/clientes/clientes.component");
var auth_guard_service_1 = require("../app/core/services/authGuard/auth-guard.service");
exports.routes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'contrato', component: contrato_component_1.ContratoComponent },
    { path: 'ficha-excursao', component: ficha_excursao_component_1.FichaExcursaoComponent },
    { path: 'orcamento', component: orcamento_component_1.OrcamentoComponent },
    { path: 'recibo', component: recibo_component_1.ReciboComponent },
    { path: 'lista-passageiros', component: lista_passageiros_component_1.ListaPassageirosComponent },
    { path: 'clientes', component: clientes_component_1.ClientesComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
];
