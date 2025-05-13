import { TestBed } from '@angular/core/testing';

import { SaldoAnteriorService } from './saldo-anterior.service';

describe('SaldoAnteriorService', () => {
  let service: SaldoAnteriorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldoAnteriorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
