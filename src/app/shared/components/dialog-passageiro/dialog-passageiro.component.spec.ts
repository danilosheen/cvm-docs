import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPassageiroComponent } from './dialog-passageiro.component';

describe('DialogPassageiroComponent', () => {
  let component: DialogPassageiroComponent;
  let fixture: ComponentFixture<DialogPassageiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPassageiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
