import { TestBed } from '@angular/core/testing';

import { ViagemSettingsService } from './viagem-settings.service';

describe('ViagemSettingsService', () => {
  let service: ViagemSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViagemSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
