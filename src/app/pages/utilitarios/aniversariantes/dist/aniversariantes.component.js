"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AniversariantesComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../../shared/components/footer/footer.component");
var cliente_service_1 = require("../../../core/services/clienteService/cliente.service");
var loading_blue_component_1 = require("../../../shared/components/loading-blue/loading-blue.component");
var input_select_component_1 = require("../../../shared/components/input-select/input-select.component");
var AniversariantesComponent = /** @class */ (function () {
    function AniversariantesComponent() {
        var _this = this;
        this.date = new Date();
        this.mesAtual = this.date.getMonth();
        this.mesSelected = this.mesAtual;
        this.clienteService = core_1.inject(cliente_service_1.ClienteService);
        this.clientes = [];
        this.aniversariantesDoMes = [];
        this.isLoading = false;
        this.meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        this.isLoading = true;
        this.clienteService.getAll().subscribe(function (clientes) {
            _this.clientes = clientes;
            _this.atualizaAniversariantes();
            _this.isLoading = false;
        });
    }
    AniversariantesComponent.prototype.atualizaAniversariantes = function () {
        var _this = this;
        if (this.clientes) {
            this.clientes.forEach(function (cliente) {
                if (cliente.dataNascimento) {
                    var mesAniversario = parseInt(cliente.dataNascimento.slice(3, 5)) - 1;
                    if (mesAniversario == _this.mesSelected) {
                        _this.aniversariantesDoMes.push(cliente);
                    }
                }
            });
        }
    };
    // handlers
    AniversariantesComponent.prototype.updateSelectedMonth = function (value) {
        if (value.value) {
            var mes = value.value;
            for (var i = 0; i < this.meses.length; i++) {
                if (mes == this.meses[i]) {
                    this.mesSelected = i;
                }
            }
            this.aniversariantesDoMes = [];
            this.atualizaAniversariantes();
        }
    };
    AniversariantesComponent = __decorate([
        core_1.Component({
            selector: 'app-aniversariantes',
            imports: [navbar_component_1.NavbarComponent, footer_component_1.FooterComponent, loading_blue_component_1.LoadingBlueComponent, input_select_component_1.InputSelectComponent],
            templateUrl: './aniversariantes.component.html',
            styleUrl: './aniversariantes.component.css'
        })
    ], AniversariantesComponent);
    return AniversariantesComponent;
}());
exports.AniversariantesComponent = AniversariantesComponent;
