import { TestBed } from '@angular/core/testing';

import { NotaAgradecimentoService } from './nota-agradecimento.service';

describe('NotaAgradecimentoService', () => {
  let service: NotaAgradecimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaAgradecimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
