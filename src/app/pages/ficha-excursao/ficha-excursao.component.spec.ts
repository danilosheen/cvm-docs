import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaExcursaoComponent } from './ficha-excursao.component';

describe('FichaExcursaoComponent', () => {
  let component: FichaExcursaoComponent;
  let fixture: ComponentFixture<FichaExcursaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaExcursaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaExcursaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
