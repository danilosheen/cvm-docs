"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CalculadoraComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var input_radio_component_1 = require("../../shared/components/input-radio/input-radio.component");
var br_currency_pipe_1 = require("../../pipes/br-currency.pipe");
var icon_1 = require("@angular/material/icon");
var divider_1 = require("@angular/material/divider");
var html2canvas_1 = require("html2canvas");
var viagem_settings_service_1 = require("../../core/services/viagemSettingsService/viagem-settings.service");
var CalculadoraComponent = /** @class */ (function () {
    function CalculadoraComponent() {
        this.settingsService = core_1.inject(viagem_settings_service_1.ViagemSettingsService);
        this.loadingShare = false;
        this.valid = [];
        this.loading = false;
        this.buttonCopy = false;
        for (var i = 0; i < 4; i++) {
            this.valid[i] = false;
        }
        this.settingsViagem = this.settingsService.load();
    }
    CalculadoraComponent.prototype.calcularViagem = function () {
        this.loading = true;
        this.settingsViagem.combustivelNecessario = this.calcularCombustivelNecessario(this.settingsViagem.distanciaKM || 0, this.settingsViagem.autonomiaVeiculo || 0);
        this.settingsViagem.custoTotalCombustivel = this.calcularCustoTotalCombustivel(this.settingsViagem.combustivelNecessario || 0, this.settingsViagem.precoCombustivel || 0);
        this.settingsViagem.valorDesgasteDoVeiculo =
            this.settingsViagem.custoTotalCombustivel *
                (this.settingsViagem.desgasteDoVeiculo / 100);
        //percorre o array e retorna o somatório acumulado dos valores
        this.settingsViagem.somatorioHospedagens = this.settingsViagem.valoresHospedagem.reduce(function (total, hospedagem) { return total + hospedagem; }, 0);
        this.settingsViagem.somatorioRefeicoes = this.settingsViagem.valoresRefeicao.reduce(function (total, refeicao) { return total + refeicao; }, 0);
        this.settingsViagem.somatorioPedagios = this.settingsViagem.valoresPedagio.reduce(function (total, pedagio) { return total + pedagio; }, 0);
        this.settingsViagem.somatorioDiariasMotorista = this.settingsViagem.valorDiariaMotorista * this.settingsViagem.diasDeViagem;
        this.settingsViagem.custoTotalDespesa =
            this.settingsViagem.custoTotalCombustivel +
                this.settingsViagem.valorDesgasteDoVeiculo +
                this.settingsViagem.somatorioHospedagens +
                this.settingsViagem.somatorioRefeicoes +
                this.settingsViagem.somatorioPedagios +
                this.settingsViagem.somatorioDiariasMotorista;
        // Somatório com despesa
        this.settingsViagem.valorMargemDeLucro = this.settingsViagem.custoTotalDespesa * (this.settingsViagem.margemDeLucro / 100);
        this.settingsViagem.custoTotalViagemComDespesa = this.settingsViagem.custoTotalDespesa + this.settingsViagem.valorMargemDeLucro;
        this.settingsViagem.valorPorKm = this.settingsViagem.custoTotalViagemComDespesa / this.settingsViagem.distanciaKM;
        // Custo total sem despesa
        this.settingsViagem.custoTotalViagemSemDespesa =
            this.settingsViagem.custoTotalViagemComDespesa -
                this.settingsViagem.somatorioHospedagens -
                this.settingsViagem.somatorioRefeicoes;
        // Custo total com nota
        this.settingsViagem.custoTotalViagemComNota =
            this.settingsViagem.custoTotalViagemComDespesa * 1.10;
        // salva no localStorage
        this.settingsService.save(this.settingsViagem);
        this.loading = false;
        console.log(this.settingsViagem.valoresHospedagem);
    };
    CalculadoraComponent.prototype.camposPreenchidos = function () {
        // console.log(this.valid)
        return this.valid.every(function (element) { return element === true; });
    };
    CalculadoraComponent.prototype.calcularCombustivelNecessario = function (distanciaKM, autonomiaVeiculo) {
        return (distanciaKM / autonomiaVeiculo);
    };
    CalculadoraComponent.prototype.calcularCustoTotalCombustivel = function (combustivelNecessario, precoCombustivel) {
        return (combustivelNecessario * precoCombustivel);
    };
    CalculadoraComponent.prototype.adicionarValorLista = function (lista, valor, index) {
        lista[index] = valor;
    };
    CalculadoraComponent.prototype.removerValorLista = function (lista, index) {
        lista.splice(index, 1);
    };
    CalculadoraComponent.prototype.addDiaHospedagem = function () {
        this.settingsViagem.contadorHospedagens++;
    };
    CalculadoraComponent.prototype.removerDiaHospedagem = function () {
        if (this.settingsViagem.contadorHospedagens > 1) {
            this.settingsViagem.contadorHospedagens--;
            this.settingsViagem.valoresHospedagem.pop();
        }
    };
    CalculadoraComponent.prototype.addDiaRefeicao = function () {
        this.settingsViagem.contadorRefeicoes++;
    };
    CalculadoraComponent.prototype.removerDiarefeicao = function () {
        if (this.settingsViagem.contadorRefeicoes > 1) {
            this.settingsViagem.contadorRefeicoes--;
            this.settingsViagem.valoresRefeicao.pop();
        }
    };
    CalculadoraComponent.prototype.captureAndShare = function () {
        var _this = this;
        this.loadingShare = true;
        html2canvas_1["default"](this.captureDiv.nativeElement).then(function (canvas) {
            var desiredWidth = 2000;
            var scale = desiredWidth / canvas.width;
            var scaledCanvas = document.createElement('canvas');
            scaledCanvas.width = desiredWidth;
            scaledCanvas.height = canvas.height * scale;
            var ctx = scaledCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
                scaledCanvas.toBlob(function (blob) {
                    if (blob) {
                        var file = new File([blob], 'cálculo_viagem.png', { type: 'image/png' });
                        _this.shareImage(file);
                    }
                });
            }
            _this.loadingShare = false;
        });
    };
    CalculadoraComponent.prototype.shareImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, url, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator.share) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.share({
                                files: [file],
                                title: 'Calculadora',
                                text: 'Cálculo de viagem CVM'
                            })];
                    case 2:
                        _a.sent();
                        console.log('Compartilhamento realizado!');
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Erro ao compartilhar:', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        url = URL.createObjectURL(file);
                        a = document.createElement("a");
                        a.href = url;
                        a.download = file.name || "cálculo_viagem.png";
                        a.click();
                        URL.revokeObjectURL(url);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CalculadoraComponent.prototype.copiarTotaisToClipboard = function () {
        var _this = this;
        var totais = this.settingsViagem.custoTotalViagemSemDespesa + "\t" + this.settingsViagem.custoTotalViagemComDespesa + "\t" + this.settingsViagem.custoTotalViagemComNota;
        navigator.clipboard.writeText(totais).then(function () {
            _this.buttonCopy = true;
            console.log("Copiado para a área de transferência!");
        })["catch"](function (err) {
            _this.buttonCopy = false;
            console.error("Erro ao copiar:", err);
        });
    };
    // handlers
    CalculadoraComponent.prototype.updatePrecoCombustivelHandler = function (value) {
        this.settingsViagem.precoCombustivel = value.value;
        this.valid[0] = value.valid;
    };
    CalculadoraComponent.prototype.updateDistanciaEmKmHandler = function (value) {
        this.settingsViagem.distanciaKM = value.value;
        this.valid[1] = value.valid;
    };
    CalculadoraComponent.prototype.updateAutonomiaDoVeiculoHandler = function (value) {
        this.settingsViagem.autonomiaVeiculo = value.value;
        this.valid[2] = value.valid;
    };
    CalculadoraComponent.prototype.updateDesgasteDoVeiculoHandler = function (value) {
        this.settingsViagem.desgasteDoVeiculo = value.value;
        this.valid[3] = value.valid;
    };
    CalculadoraComponent.prototype.updateDiasDeViagemHandler = function (value) {
        this.settingsViagem.diasDeViagem = value.value;
    };
    CalculadoraComponent.prototype.updateRadioHospedagemSelectedHandler = function (value) {
        this.settingsViagem.valoresHospedagem = [];
        value.value == 'Sim' ? this.settingsViagem.contadorHospedagens = 1 : 0;
        this.settingsViagem.hospedagemOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateRadioRefeicaoSelectedHandler = function (value) {
        this.settingsViagem.valoresRefeicao = [];
        value.value == 'Sim' ? this.settingsViagem.contadorRefeicoes = 1 : 0;
        this.settingsViagem.refeicaoOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateRadioPedagioSelectedHandler = function (value) {
        this.settingsViagem.valoresPedagio = [];
        this.settingsViagem.quantidadePedagios = 0;
        this.settingsViagem.pedagioOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateQuantidadePedagiosHandler = function (value) {
        this.settingsViagem.quantidadePedagios = value.value;
    };
    CalculadoraComponent.prototype.updateRadioMotoristaSelectedHandler = function (value) {
        this.settingsViagem.motoristaOptionSelected = value.value;
    };
    CalculadoraComponent.prototype.updateValorDiariaMotoristaHandler = function (value) {
        this.settingsViagem.valorDiariaMotorista = 0;
        this.settingsViagem.valorDiariaMotorista = value.value;
    };
    CalculadoraComponent.prototype.updateMargemDeLucroHandler = function (value) {
        this.settingsViagem.margemDeLucro = value.value;
    };
    __decorate([
        core_1.ViewChild('captureDiv')
    ], CalculadoraComponent.prototype, "captureDiv");
    CalculadoraComponent = __decorate([
        core_1.Component({
            selector: 'app-calculadora',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                input_number_component_1.InputNumberComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                input_radio_component_1.InputRadioComponent,
                br_currency_pipe_1.BrCurrencyPipe,
                icon_1.MatIconModule,
                divider_1.MatDividerModule,
                icon_1.MatIconModule
            ],
            templateUrl: './calculadora.component.html',
            styleUrl: './calculadora.component.css'
        })
    ], CalculadoraComponent);
    return CalculadoraComponent;
}());
exports.CalculadoraComponent = CalculadoraComponent;
