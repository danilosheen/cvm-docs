import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoHistoryComponent } from './contrato-history.component';

describe('ContratoHistoryComponent', () => {
  let component: ContratoHistoryComponent;
  let fixture: ComponentFixture<ContratoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
