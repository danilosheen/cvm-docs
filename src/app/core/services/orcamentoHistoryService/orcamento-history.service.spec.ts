import { TestBed } from '@angular/core/testing';

import { OrcamentoHistoryService } from './orcamento-history.service';

describe('OrcamentoHistoryService', () => {
  let service: OrcamentoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrcamentoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
