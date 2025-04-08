import { TestBed } from '@angular/core/testing';

import { ListaPassageirosService } from '../listaPassageirosService/lista-passageiros.service';

describe('ListaPassageirosService', () => {
  let service: ListaPassageirosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPassageirosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
