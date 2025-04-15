import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBlueComponent } from './loading-blue.component';

describe('LoadingBlueComponent', () => {
  let component: LoadingBlueComponent;
  let fixture: ComponentFixture<LoadingBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBlueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
