import { TestBed } from '@angular/core/testing';

import { GerarRelatorioService } from './gerar-relatorio.service';

describe('GerarRelatorioService', () => {
  let service: GerarRelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerarRelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
