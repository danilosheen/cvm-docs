import { TestBed } from '@angular/core/testing';

import { LabelFontSizeService } from './label-font-size.service';

describe('LabelFontSizeService', () => {
  let service: LabelFontSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelFontSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
