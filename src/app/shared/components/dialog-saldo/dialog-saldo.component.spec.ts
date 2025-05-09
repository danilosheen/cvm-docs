import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaldoComponent } from './dialog-saldo.component';

describe('DialogSaldoComponent', () => {
  let component: DialogSaldoComponent;
  let fixture: ComponentFixture<DialogSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
