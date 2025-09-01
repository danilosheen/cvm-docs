import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonChangeLabelFontSizeComponent } from './button-change-label-font-size.component';

describe('ButtonChangeLabelFontSizeComponent', () => {
  let component: ButtonChangeLabelFontSizeComponent;
  let fixture: ComponentFixture<ButtonChangeLabelFontSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonChangeLabelFontSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonChangeLabelFontSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
