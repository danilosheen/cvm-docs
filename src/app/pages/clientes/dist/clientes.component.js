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
exports.ClientesComponent = void 0;
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
var dialog_cliente_component_1 = require("../../shared/components/dialog-cliente/dialog-cliente.component");
var dialog_view_component_1 = require("../../shared/components/dialog-view/dialog-view.component");
var data_formatada_pipe_1 = require("../../pipes/data-formatada.pipe");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(authService, clienteService, paginatorIntl, router) {
        this.authService = authService;
        this.clienteService = clienteService;
        this.paginatorIntl = paginatorIntl;
        this.router = router;
        this.displayedColumns = ['nome', 'dataNascimento', 'contato', 'ultimaViagem', 'acao'];
        this.clientes = [];
        this.dialog = core_1.inject(dialog_1.MatDialog);
        this.dialogCliente = core_1.inject(dialog_1.MatDialog);
        this.hasClient = true;
        this.dataSource = new table_1.MatTableDataSource();
        this.customizarPaginador();
    }
    ClientesComponent.prototype.ngAfterViewInit = function () {
        if (this.authService.getToken()) {
            this.carregarClientes();
        }
    };
    ClientesComponent.prototype.carregarClientes = function () {
        var _this = this;
        this.clienteService.getAll().subscribe(function (result) {
            _this.clientes = result;
            _this.dataSource.data = _this.clientes;
            setTimeout(function () {
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                if (_this.clientes.length == 0) {
                    _this.hasClient = false;
                }
            });
        });
    };
    ClientesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ClientesComponent.prototype.openVisualizarCliente = function (enterAnimationDuration, exitAnimationDuration, cliente) {
        var dialogRef = this.dialogCliente.open(dialog_view_component_1.DialogViewComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                pessoa: cliente,
                type: 'cliente'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                // this.editarCliente(cliente.id!, cliente)
            }
        });
    };
    ClientesComponent.prototype.openAdicionarCliente = function (enterAnimationDuration, exitAnimationDuration) {
        var _this = this;
        var dialogRef = this.dialogCliente.open(dialog_cliente_component_1.DialogClienteComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                title: 'adicionar',
                confirmButton: 'Salvar'
            }
        });
        dialogRef.afterClosed().subscribe(function (cliente) {
            if (cliente) {
                _this.clienteService.create(cliente).subscribe(function (response) {
                    var listaTemp = __spreadArrays(_this.dataSource.data, [response]);
                    listaTemp.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
                    _this.clientes = listaTemp;
                    _this.dataSource.data = _this.clientes;
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    _this.hasClient = _this.dataSource.data.length > 0;
                });
            }
        });
    };
    ClientesComponent.prototype.openEditarCliente = function (enterAnimationDuration, exitAnimationDuration, cliente) {
        var _this = this;
        var dialogRef = this.dialogCliente.open(dialog_cliente_component_1.DialogClienteComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                cliente: cliente,
                title: 'editar',
                confirmButton: 'Atualizar'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.editarCliente(cliente.id, cliente);
            }
            else {
                _this.carregarClientes();
            }
        });
    };
    ClientesComponent.prototype.openRemoverCliente = function (enterAnimationDuration, exitAnimationDuration, id) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_generic_component_1.DialogGenericComponent, {
            enterAnimationDuration: enterAnimationDuration,
            exitAnimationDuration: exitAnimationDuration,
            data: {
                dialogTitle: 'Remover cliente',
                dialogContent: 'Você tem certeza que deseja remover o cliente?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.removerCliente(id);
            }
        });
    };
    ClientesComponent.prototype.editarCliente = function (id, cliente) {
        var updatedAt = new Date().toISOString();
        cliente.updatedAt = updatedAt;
        this.clienteService.update(id, cliente).subscribe(function () {
        });
    };
    ClientesComponent.prototype.removerCliente = function (id) {
        var _this = this;
        this.clienteService["delete"](id).subscribe(function () {
            var listaTemp = _this.dataSource.data.filter(function (cliente) { return cliente.id !== id; });
            _this.clientes = listaTemp;
            _this.dataSource.data = _this.clientes;
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.hasClient = _this.clientes.length > 0;
        });
    };
    // Personalização do paginator do Angular Material
    ClientesComponent.prototype.customizarPaginador = function () {
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
    ], ClientesComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ClientesComponent.prototype, "sort");
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
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
                common_1.NgIf,
                data_formatada_pipe_1.DataFormatadaPipe
            ],
            templateUrl: './clientes.component.html',
            styleUrl: './clientes.component.css'
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
