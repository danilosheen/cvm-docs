import { TestBed } from '@angular/core/testing';

import { ContratoHistoryService } from './contrato-history.service';

describe('ContratoHistoryService', () => {
  let service: ContratoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
