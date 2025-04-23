import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaAgradecimentoComponent } from './nota-agradecimento.component';

describe('NotaAgradecimentoComponent', () => {
  let component: NotaAgradecimentoComponent;
  let fixture: ComponentFixture<NotaAgradecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaAgradecimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaAgradecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
