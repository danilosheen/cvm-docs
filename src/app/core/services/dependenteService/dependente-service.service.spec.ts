import { TestBed } from '@angular/core/testing';

import { DependenteServiceService } from './dependente-service.service';

describe('DependenteServiceService', () => {
  let service: DependenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
