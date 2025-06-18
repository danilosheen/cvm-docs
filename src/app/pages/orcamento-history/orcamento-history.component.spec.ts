import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoHistoryComponent } from './orcamento-history.component';

describe('OrcamentoHistoryComponent', () => {
  let component: OrcamentoHistoryComponent;
  let fixture: ComponentFixture<OrcamentoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentoHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
