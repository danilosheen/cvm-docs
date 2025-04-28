import { TestBed } from '@angular/core/testing';

import { FluxoCaixaService } from './fluxo-caixa.service';

describe('FluxoCaixaService', () => {
  let service: FluxoCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluxoCaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
