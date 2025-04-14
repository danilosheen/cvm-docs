import { TestBed } from '@angular/core/testing';

import { PassageiroServiceService } from './passageiro-service.service';

describe('PassageiroServiceService', () => {
  let service: PassageiroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassageiroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
