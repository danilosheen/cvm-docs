import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMonthYearComponent } from './input-month-year.component';

describe('InputMonthYearComponent', () => {
  let component: InputMonthYearComponent;
  let fixture: ComponentFixture<InputMonthYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMonthYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
