import { TestBed } from '@angular/core/testing';

import { OrcamentoBehaviorSubjectService } from './orcamento-behavior-subject.service';

describe('OrcamentoBehaviorSubjectService', () => {
  let service: OrcamentoBehaviorSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrcamentoBehaviorSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
