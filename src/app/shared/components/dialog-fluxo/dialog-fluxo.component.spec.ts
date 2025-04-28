import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFluxoComponent } from './dialog-fluxo.component';

describe('DialogFluxoComponent', () => {
  let component: DialogFluxoComponent;
  let fixture: ComponentFixture<DialogFluxoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFluxoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFluxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
