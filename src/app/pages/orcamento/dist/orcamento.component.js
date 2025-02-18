"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrcamentoComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_interop_1 = require("@angular/core/rxjs-interop");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var core_3 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var formats_1 = require("./formats");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var icon_1 = require("@angular/material/icon");
var OrcamentoComponent = /** @class */ (function () {
    function OrcamentoComponent(pdfOrcamento) {
        var _this = this;
        this.pdfOrcamento = pdfOrcamento;
        this.loading = false;
        this.errorMessage = core_1.signal('');
        this.orcamentoForm = new forms_1.FormGroup({});
        Object.keys(this.orcamentoForm.controls).forEach(function (field) {
            var control = _this.orcamentoForm.get(field);
            // Usando merge corretamente com observáveis de statusChanges e valueChanges
            if (control) {
                rxjs_1.merge(control.statusChanges, control.valueChanges)
                    .pipe(rxjs_interop_1.takeUntilDestroyed())
                    .subscribe(function () { return _this.updateErrorMessage(); });
            }
        });
    }
    OrcamentoComponent.prototype.ngOnInit = function () {
        // Inicializando o FormGroup com todos os controles
        this.orcamentoForm = new forms_1.FormGroup({
            nomeCliente: new forms_1.FormControl('', [forms_1.Validators.required]),
            telefoneContato: new forms_1.FormControl(''),
            pacoteViagem: new forms_1.FormControl(''),
            localSaida: new forms_1.FormControl(''),
            dataSaida: new forms_1.FormControl(''),
            horaSaida: new forms_1.FormControl(''),
            dataRetorno: new forms_1.FormControl(''),
            horaRetorno: new forms_1.FormControl(''),
            valor: new forms_1.FormControl(''),
            modeloVan: new forms_1.FormControl('')
        });
    };
    OrcamentoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        var dadosFormatados = this.formatarDados();
        console.log(dadosFormatados);
        this.pdfOrcamento.generatePDF(dadosFormatados).subscribe(function (pdfBlob) {
            _this.loading = false;
            var pdfUrl = URL.createObjectURL(pdfBlob);
            var link = document.createElement('a');
            var date = new Date();
            link.href = pdfUrl;
            link.download = "Orcamento CVM " + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds() + ".pdf";
            link.click();
        }, function (error) {
            _this.loading = false;
            console.error('Erro ao gerar o PDF:', error);
        });
    };
    OrcamentoComponent.prototype.updateErrorMessage = function () {
        var _this = this;
        // Iterando sobre todos os controles do FormGroup
        Object.keys(this.orcamentoForm.controls).forEach(function (field) {
            var control = _this.orcamentoForm.get(field);
            if (control) {
                // Verificando erros de cada controle individualmente
                if (control.hasError('required')) {
                    _this.errorMessage.set(field + " is required");
                }
                else if (control.hasError('email')) {
                    _this.errorMessage.set("Invalid email format for " + field);
                }
                else {
                    _this.errorMessage.set('');
                }
            }
        });
    };
    OrcamentoComponent.prototype.formatarDados = function () {
        console.log(this.orcamentoForm.value);
        var dadosOrcamento = {
            nomeCliente: this.orcamentoForm.value.nomeCliente,
            telefoneContato: this.orcamentoForm.value.telefoneContato,
            pacoteViagem: this.orcamentoForm.value.pacoteViagem,
            localSaida: this.orcamentoForm.value.localSaida,
            dataSaida: this.orcamentoForm.value.dataSaida.toLocaleString().slice(0, 10),
            horaSaida: this.orcamentoForm.value.horaSaida,
            dataRetorno: this.orcamentoForm.value.dataRetorno.toLocaleString().slice(0, 10),
            horaRetorno: this.orcamentoForm.value.horaRetorno,
            valor: this.orcamentoForm.value.valor,
            modeloVan: this.orcamentoForm.value.modeloVan
        };
        return dadosOrcamento;
    };
    OrcamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-orcamento',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                datepicker_1.MatDatepickerModule,
                common_1.NgIf,
                button_1.MatButtonModule,
                divider_1.MatDividerModule,
                icon_1.MatIconModule
            ],
            providers: [core_3.provideNativeDateAdapter(),
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'pt-BR' },
                { provide: core_2.MAT_DATE_FORMATS, useValue: formats_1.MY_FORMATS },
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './orcamento.component.html',
            styleUrl: './orcamento.component.css'
        })
    ], OrcamentoComponent);
    return OrcamentoComponent;
}());
exports.OrcamentoComponent = OrcamentoComponent;
