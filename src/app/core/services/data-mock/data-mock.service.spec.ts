import { TestBed } from '@angular/core/testing';

import { DataMockService } from './data-mock.service';

describe('DataMockService', () => {
  let service: DataMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
