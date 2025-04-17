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


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'contrato', component: ContratoComponent },
  { path: 'ficha-excursao', component: FichaExcursaoComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'recibo', component: ReciboComponent },
  { path: 'lista-passageiros', component: ListaPassageirosComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
  { path: 'passageiros', component: PassageirosComponent, canActivate: [AuthGuardService] },
];
