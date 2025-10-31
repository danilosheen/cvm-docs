import { Routes } from '@angular/router';
import { AuthGuardService } from '../app/core/services/authGuard/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { GerenciarUsuariosComponent } from './pages/gerenciar-usuarios/gerenciar-usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { FichaExcursaoComponent } from './pages/ficha-excursao/ficha-excursao.component';
import { ContratoComponent } from './pages/contrato/contrato.component';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { ListaPassageirosComponent } from './pages/lista-passageiros/lista-passageiros.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PassageirosComponent } from './pages/passageiros/passageiros.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { UtilitariosComponent } from './pages/utilitarios/utilitarios.component';
import { AniversariantesComponent } from './pages/utilitarios/aniversariantes/aniversariantes.component';
import { ControleContasComponent } from './pages/controle-contas/controle-contas.component';
import { NotaAgradecimentoComponent } from './pages/utilitarios/nota-agradecimento/nota-agradecimento.component';
import { OrcamentoHistoryComponent } from './pages/orcamento-history/orcamento-history.component';
import { ListaPassageirosHistoryComponent } from './pages/lista-passageiros-history/lista-passageiros-history.component';
import { ContratoHistoryComponent } from './pages/contrato-history/contrato-history.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, canActivate: [AuthGuardService], data: { modulo: 'gerenciar-usuarios' } },
  { path: 'ficha-excursao', component: FichaExcursaoComponent, canActivate: [AuthGuardService], data: { modulo: 'ficha-excursao' } },
  { path: 'contrato', component: ContratoComponent, canActivate: [AuthGuardService], data: { modulo: 'contrato' } },
  { path: 'contrato-history', component: ContratoHistoryComponent, canActivate: [AuthGuardService], data: { modulo: 'contrato-history' } },
  { path: 'orcamento', component: OrcamentoComponent, canActivate: [AuthGuardService], data: { modulo: 'orcamento' } },
  { path: 'orcamento-history', component: OrcamentoHistoryComponent, canActivate: [AuthGuardService], data: { modulo: 'orcamento-history' } },
  { path: 'recibo', component: ReciboComponent, canActivate: [AuthGuardService], data: { modulo: 'recibo' } },
  { path: 'controle-contas', component: ControleContasComponent, canActivate: [AuthGuardService], data: { modulo: 'controle-contas' } },
  { path: 'lista-passageiros', component: ListaPassageirosComponent, canActivate: [AuthGuardService], data: { modulo: 'lista-passageiros' }},
  { path: 'lista-passageiros-history', component: ListaPassageirosHistoryComponent, canActivate: [AuthGuardService], data: { modulo: 'lista-passageiros-history' } },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService], data: { modulo: 'clientes' } },
  { path: 'passageiros', component: PassageirosComponent, canActivate: [AuthGuardService], data: { modulo: 'passageiros' } },
  { path: 'calculadora', component: CalculadoraComponent, canActivate: [AuthGuardService], data: { modulo: 'calculadora' } },
  { path: 'utilitarios', component: UtilitariosComponent, canActivate: [AuthGuardService], data: { modulo: 'utilitarios' } },
  { path: 'utilitarios/aniversariantes', component: AniversariantesComponent },
  { path: 'utilitarios/nota-agradecimento', component: NotaAgradecimentoComponent },
];
