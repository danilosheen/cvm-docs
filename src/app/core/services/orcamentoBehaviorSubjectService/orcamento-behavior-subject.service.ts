import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrcamentoHistory } from '../../../interfaces/i-orcamentoHistory';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoBehaviorSubjectService {

  private orcamentoSubject = new BehaviorSubject<any>(null);
  public orcamentoSelecionado$ = this.orcamentoSubject.asObservable();

  setOrcamento(orcamento: IOrcamentoHistory) {
    this.orcamentoSubject.next(orcamento);
  }

  clearOrcamento() {
    this.orcamentoSubject.next(null);
  }
}
