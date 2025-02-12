import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FichaExcursaoComponent } from './pages/ficha-excursao/ficha-excursao.component';
import { ContratoComponent } from './pages/contrato/contrato.component';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contrato', component: ContratoComponent },
  { path: 'ficha-excursao', component: FichaExcursaoComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'recibo', component: ReciboComponent },
];
