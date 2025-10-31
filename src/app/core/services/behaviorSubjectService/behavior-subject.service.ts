import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrcamentoHistory } from '../../../interfaces/i-orcamentoHistory';
import { IListaPassageirosHistory } from '../../../interfaces/i-listaPassageirosHistory';
import { IContratoHistory } from '../../../interfaces/i-contrato-history';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private orcamentoBehaviorSubject = new BehaviorSubject<any>(null);
  private contratoBehaviorSubject = new BehaviorSubject<any>(null);
  private listaPassageirosBehaviorSubject = new BehaviorSubject<any>(null);
  private reciboBehaviorSubject = new BehaviorSubject<any>(null);
  private fichaExcursaoBehaviorSubject = new BehaviorSubject<any>(null);
  private permissoesBehaviorSubject = new BehaviorSubject<string[]>([]);

  public orcamentoSelecionado$ = this.orcamentoBehaviorSubject.asObservable();
  public contratoSelecionado$ = this.contratoBehaviorSubject.asObservable();
  public listaPassageirosSelecionado$ = this.listaPassageirosBehaviorSubject.asObservable();
  public reciboSelecionado$ = this.reciboBehaviorSubject.asObservable();
  public fichaExcursaoSelecionado$ = this.fichaExcursaoBehaviorSubject.asObservable();
  public permissoes$ = this.permissoesBehaviorSubject.asObservable();

  setOrcamento(orcamento: IOrcamentoHistory) {
    this.orcamentoBehaviorSubject.next(orcamento);
  }

  clearOrcamento() {
    this.orcamentoBehaviorSubject.next(null);
  }

  setContrato(contrato: IContratoHistory) {
    this.contratoBehaviorSubject.next(contrato);
  }

  clearContrato() {
    this.contratoBehaviorSubject.next(null);
  }

  setListaPassageiros(listaPassageiros: IListaPassageirosHistory) {
    this.listaPassageirosBehaviorSubject.next(listaPassageiros);
  }

  clearListaPassageiros() {
    this.listaPassageirosBehaviorSubject.next(null);
  }

  setRecibo(item: any) {
    this.reciboBehaviorSubject.next(item);
  }

  clearRecibo() {
    this.reciboBehaviorSubject.next(null);
  }

  setFichaExcursao(item: any) {
    this.fichaExcursaoBehaviorSubject.next(item);
  }

  clearFichaExcursao() {
    this.fichaExcursaoBehaviorSubject.next(null);
  }

  setPermissoes(item: any) {
    this.permissoesBehaviorSubject.next(item);
  }

  clearPermissoes() {
    this.permissoesBehaviorSubject.next([]);
  }
}
