import { TestBed } from '@angular/core/testing';

import { ListaPassageirosHistoryService } from './lista-passageiros-history.service';

describe('ListaPassageirosHistoryService', () => {
  let service: ListaPassageirosHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPassageirosHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
