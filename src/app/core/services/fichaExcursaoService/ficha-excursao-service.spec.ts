import { TestBed } from '@angular/core/testing';
import { FichaExcursaoService } from './ficha-excursao.service';

describe('FichaExcursaoServiceService', () => {
  let service: FichaExcursaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaExcursaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
