"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PassageirosComponent = void 0;
var core_1 = require("@angular/core");
var navbar_component_1 = require("../../shared/components/navbar/navbar.component");
var footer_component_1 = require("../../shared/components/footer/footer.component");
var forms_1 = require("@angular/forms");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var dialog_1 = require("@angular/material/dialog");
var dialog_generic_component_1 = require("../../shared/components/dialog-generic/dialog-generic.component");
var button_1 = require("@angular/material/button");
var loading_blue_component_1 = require("../../shared/components/loading-blue/loading-blue.component");
var common_1 = require("@angular/common");
var dialog_view_component_1 = require("../../shared/components/dialog-view/dialog-view.component");
var dialog_passageiro_component_1 = require("../../shared/components/dialog-passageiro/dialog-passageiro.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var PassageirosComponent = /** @class */ (function () {
    function PassageirosComponent(authService, passageiroService, paginatorIntl) {
        this.authService = authService;
        this.passageiroService = passageiroService;
        this.paginatorIntl = paginatorIntl;
        this.displayedColumns = ['nome', 'tipoDocumento', 'documento', 'acao'];
        this.passageiros = [];
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.dialogPassageiro = core_1.inject(dialog_1.MatDialog);
        this.snackBar = core_1.inject(snack_bar_1.MatSnackBar);
        this.hasPassageiro = true;
        this.dataSource = new table_1.MatTableDataSource();
        this.customizarPaginador();
    }
    PassageirosComponent.prototype.ngAfterViewInit = function () {
        if (this.authService.getToken()) {
            this.carregarPassageiros();
        }
    };
    PassageirosComponent.prototype.carregarPassageiros = function () {
        var _this = this;
        this.passageiroService.getAll().subscribe(function (result) {
            _this.passageiros = result;
            _this.dataSource.data = _this.passageiros;
            setTimeout(function () {
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                if (_this.passageiros.length == 0) {
                    _this.hasPassageiro = false;
                }
            });
        });
    };
    PassageirosComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    PassageirosComponent.prototype.openVisualizarPassageiro = function (enterAnimationDuration, exitAnimationDuration, passageiro) {
        var dialogRef = this.dialogPassageiro.open(dialog_view_component_1.DialogViewComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                pessoa: passageiro,
                type: 'passageiro'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                // this.editarCliente(cliente.id!, cliente)
            }
        });
    };
    PassageirosComponent.prototype.openAdicionarPassageiro = function (enterAnimationDuration, exitAnimationDuration) {
        var _this = this;
        var dialogRef = this.dialogPassageiro.open(dialog_passageiro_component_1.DialogPassageiroComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                title: 'adicionar',
                confirmButton: 'Salvar'
            }
        });
        dialogRef.afterClosed().subscribe(function (passageiro) {
            if (passageiro) {
                _this.passageiroService.create(passageiro).subscribe(function (response) {
                    var listaTemp = __spreadArrays(_this.dataSource.data, [response]);
                    listaTemp.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
                    _this.passageiros = listaTemp;
                    _this.dataSource.data = _this.passageiros;
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    _this.hasPassageiro = _this.dataSource.data.length > 0;
                });
            }
        });
    };
    PassageirosComponent.prototype.openEditarPassageiro = function (enterAnimationDuration, exitAnimationDuration, passageiro) {
        var _this = this;
        var dialogRef = this.dialogPassageiro.open(dialog_passageiro_component_1.DialogPassageiroComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                passageiro: passageiro,
                title: 'editar',
                confirmButton: 'Atualizar'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var updatedAt = new Date().toISOString();
                passageiro.updatedAt = updatedAt;
                _this.editarPassageiro(passageiro.id, passageiro);
            }
            else {
                _this.carregarPassageiros();
            }
        });
    };
    PassageirosComponent.prototype.openRemoverPassageiro = function (enterAnimationDuration, exitAnimationDuration, id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                dialogTitle: 'Remover passageiro',
                dialogContent: 'Você tem certeza que deseja remover o passageiro?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.removerPassageiro(id);
            }
        });
    };
    PassageirosComponent.prototype.editarPassageiro = function (id, passageiro) {
        var updatedAt = new Date().toISOString();
        passageiro.updatedAt = updatedAt;
        this.passageiroService.update(id, passageiro).subscribe(function () {
        });
    };
    PassageirosComponent.prototype.removerPassageiro = function (id) {
        var _this = this;
        this.passageiroService["delete"](id).subscribe({
            next: function (response) {
                var listaTemp = _this.dataSource.data.filter(function (cliente) { return cliente.id !== id; });
                _this.passageiros = listaTemp;
                _this.dataSource.data = _this.passageiros;
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.hasPassageiro = _this.passageiros.length > 0;
                _this.snackBar.open(response.message, 'Ok', {
                    duration: 6000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                });
            },
            error: function (error) {
                var _a;
                var errorMsg = ((_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.error) || 'Erro ao remover passageiro';
                _this.snackBar.open(errorMsg, 'Ok', {
                    duration: 10000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                });
            }
        });
    };
    // Personalização do paginator do Angular Material
    PassageirosComponent.prototype.customizarPaginador = function () {
        this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
        this.paginatorIntl.nextPageLabel = 'Próxima página';
        this.paginatorIntl.previousPageLabel = 'Página anterior';
        this.paginatorIntl.firstPageLabel = 'Primeira página';
        this.paginatorIntl.lastPageLabel = 'Última página';
        this.paginatorIntl.getRangeLabel = function (page, pageSize, length) {
            if (length === 0 || pageSize === 0) {
                return "0 de " + length;
            }
            var startIndex = page * pageSize;
            var endIndex = Math.min(startIndex + pageSize, length);
            return startIndex + 1 + " \u2013 " + endIndex + " de " + length;
        };
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], PassageirosComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], PassageirosComponent.prototype, "sort");
    PassageirosComponent = __decorate([
        core_1.Component({
            selector: 'app-passageiros',
            imports: [
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                paginator_1.MatPaginatorModule,
                button_1.MatButtonModule,
                loading_blue_component_1.LoadingBlueComponent,
                common_1.NgIf
            ],
            templateUrl: './passageiros.component.html',
            styleUrl: './passageiros.component.css'
        })
    ], PassageirosComponent);
    return PassageirosComponent;
}());
exports.PassageirosComponent = PassageirosComponent;
