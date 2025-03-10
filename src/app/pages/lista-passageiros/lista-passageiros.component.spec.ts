import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPassageirosComponent } from './lista-passageiros.component';

describe('ListaPassageirosComponent', () => {
  let component: ListaPassageirosComponent;
  let fixture: ComponentFixture<ListaPassageirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPassageirosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPassageirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
