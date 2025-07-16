import { TestBed } from '@angular/core/testing';

import { CotratoService } from './cotrato.service';

describe('CotratoService', () => {
  let service: CotratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
