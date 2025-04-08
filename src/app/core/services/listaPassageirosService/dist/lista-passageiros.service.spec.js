"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var lista_passageiros_service_1 = require("../listaPassageirosService/lista-passageiros.service");
describe('ListaPassageirosService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(lista_passageiros_service_1.ListaPassageirosService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
