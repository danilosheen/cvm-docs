import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleContasComponent } from './controle-contas.component';

describe('ControleContasComponent', () => {
  let component: ControleContasComponent;
  let fixture: ComponentFixture<ControleContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleContasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
