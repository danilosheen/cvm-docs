import { TestBed } from '@angular/core/testing';

import { PdfOrcamentoService } from './pdf-orcamento.service';

describe('PdfOrcamentoService', () => {
  let service: PdfOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
