"use strict";
exports.__esModule = true;
exports.routes = void 0;
var auth_guard_service_1 = require("../app/core/services/authGuard/auth-guard.service");
var login_component_1 = require("./pages/login/login.component");
var home_component_1 = require("./pages/home/home.component");
var ficha_excursao_component_1 = require("./pages/ficha-excursao/ficha-excursao.component");
var contrato_component_1 = require("./pages/contrato/contrato.component");
var recibo_component_1 = require("./pages/recibo/recibo.component");
var orcamento_component_1 = require("./pages/orcamento/orcamento.component");
var lista_passageiros_component_1 = require("./pages/lista-passageiros/lista-passageiros.component");
var clientes_component_1 = require("./pages/clientes/clientes.component");
var passageiros_component_1 = require("./pages/passageiros/passageiros.component");
var calculadora_component_1 = require("./pages/calculadora/calculadora.component");
var utilitarios_component_1 = require("./pages/utilitarios/utilitarios.component");
var aniversariantes_component_1 = require("./pages/utilitarios/aniversariantes/aniversariantes.component");
var controle_contas_component_1 = require("./pages/controle-contas/controle-contas.component");
var nota_agradecimento_component_1 = require("./pages/utilitarios/nota-agradecimento/nota-agradecimento.component");
var orcamento_history_component_1 = require("./pages/orcamento-history/orcamento-history.component");
var lista_passageiros_history_component_1 = require("./pages/lista-passageiros-history/lista-passageiros-history.component");
var contrato_history_component_1 = require("./pages/contrato-history/contrato-history.component");
exports.routes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'contrato', component: contrato_component_1.ContratoComponent },
    { path: 'ficha-excursao', component: ficha_excursao_component_1.FichaExcursaoComponent },
    { path: 'contrato', component: contrato_component_1.ContratoComponent },
    { path: 'contrato-history', component: contrato_history_component_1.ContratoHistoryComponent },
    { path: 'orcamento', component: orcamento_component_1.OrcamentoComponent },
    { path: 'orcamento-history', component: orcamento_history_component_1.OrcamentoHistoryComponent },
    { path: 'recibo', component: recibo_component_1.ReciboComponent },
    { path: 'controle-contas', component: controle_contas_component_1.ControleContasComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'lista-passageiros', component: lista_passageiros_component_1.ListaPassageirosComponent },
    { path: 'lista-passageiros-history', component: lista_passageiros_history_component_1.ListaPassageirosHistoryComponent },
    { path: 'clientes', component: clientes_component_1.ClientesComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'passageiros', component: passageiros_component_1.PassageirosComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'calculadora', component: calculadora_component_1.CalculadoraComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'utilitarios', component: utilitarios_component_1.UtilitariosComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'utilitarios/aniversariantes', component: aniversariantes_component_1.AniversariantesComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'utilitarios/nota-agradecimento', component: nota_agradecimento_component_1.NotaAgradecimentoComponent },
];
