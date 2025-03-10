"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReciboComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var input_text_component_1 = require("../../shared/components/input-text/input-text.component");
var input_number_component_1 = require("../../shared/components/input-number/input-number.component");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var forms_1 = require("@angular/forms");
var ReciboComponent = /** @class */ (function () {
    function ReciboComponent(pdfRecibo) {
        this.pdfRecibo = pdfRecibo;
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.reciboData = {
            nomeCliente: '',
            pacoteViagem: '',
            valor: ''
        };
        this.valid = [];
        //inicializando o array de campos válidos
        for (var i = 0; i < 3; i++) {
            this.valid.push(false);
        }
    }
    ReciboComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.pdfRecibo.generatePDF(this.reciboData)
            .subscribe(function (pdfBlob) {
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Recibo CVM " + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
            link.click();
            _this.loading = false;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }, function (error) {
            try {
                setTimeout(function () {
                    _this.onSubmit();
                }, 1000);
            }
            catch (_a) {
                console.error('Erro ao gerar o PDF:', error);
                _this.loading = false;
            }
        });
    };
    ReciboComponent.prototype.camposValidos = function () {
        for (var _i = 0, _a = this.valid; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i == false) {
                return false;
            }
        }
        return true;
    };
    ReciboComponent.prototype.updateNomeClienteHandler = function (value) {
        this.reciboData.nomeCliente = value.value;
        this.valid[0] = (value.valid);
    };
    ReciboComponent.prototype.updatePacoteViagemHandler = function (value) {
        this.reciboData.pacoteViagem = value.value;
        this.valid[1] = (value.valid);
    };
    ReciboComponent.prototype.updateValorHandler = function (value) {
        this.reciboData.valor = value.value;
        this.valid[2] = (value.valid);
    };
    ReciboComponent = __decorate([
        core_1.Component({
            selector: 'app-recibo',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                input_text_component_1.InputTextComponent,
                input_number_component_1.InputNumberComponent,
                common_1.NgIf,
                button_1.MatButtonModule,
                forms_1.FormsModule,
            ],
            templateUrl: './recibo.component.html',
            styleUrl: './recibo.component.css'
        })
    ], ReciboComponent);
    return ReciboComponent;
}());
exports.ReciboComponent = ReciboComponent;
