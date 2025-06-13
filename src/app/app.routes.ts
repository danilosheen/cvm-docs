import { Routes } from '@angular/router';
import { AuthGuardService } from '../app/core/services/authGuard/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
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


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'contrato', component: ContratoComponent },
  { path: 'ficha-excursao', component: FichaExcursaoComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'recibo', component: ReciboComponent },
  { path: 'controle-contas', component: ControleContasComponent, canActivate: [AuthGuardService] },
  { path: 'lista-passageiros', component: ListaPassageirosComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
  { path: 'passageiros', component: PassageirosComponent, canActivate: [AuthGuardService] },
  { path: 'calculadora', component: CalculadoraComponent, canActivate: [AuthGuardService] },
  { path: 'utilitarios', component: UtilitariosComponent, canActivate: [AuthGuardService] },
  { path: 'utilitarios/aniversariantes', component: AniversariantesComponent, canActivate: [AuthGuardService] },
  { path: 'utilitarios/nota-agradecimento', component: NotaAgradecimentoComponent },
];
