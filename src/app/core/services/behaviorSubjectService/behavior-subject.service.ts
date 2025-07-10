import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrcamentoHistory } from '../../../interfaces/i-orcamentoHistory';
import { IListaPassageirosHistory } from '../../../interfaces/i-listaPassageirosHistory';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private orcamentoBehaviorSubject = new BehaviorSubject<any>(null);
  private listaPassageirosBehaviorSubject = new BehaviorSubject<any>(null);
  private reciboBehaviorSubject = new BehaviorSubject<any>(null);
  private fichaExcursaoBehaviorSubject = new BehaviorSubject<any>(null);

  public orcamentoSelecionado$ = this.orcamentoBehaviorSubject.asObservable();
  public listaPassageirosSelecionado$ = this.listaPassageirosBehaviorSubject.asObservable();
  public reciboSelecionado$ = this.reciboBehaviorSubject.asObservable();
  public fichaExcursaoSelecionado$ = this.fichaExcursaoBehaviorSubject.asObservable();

  setOrcamento(orcamento: IOrcamentoHistory) {
    this.orcamentoBehaviorSubject.next(orcamento);
  }

  clearOrcamento() {
    this.orcamentoBehaviorSubject.next(null);
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
}
