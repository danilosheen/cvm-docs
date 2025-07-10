import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPassageirosHistoryComponent } from './lista-passageiros-history.component';

describe('ListaPassageirosHistoryComponent', () => {
  let component: ListaPassageirosHistoryComponent;
  let fixture: ComponentFixture<ListaPassageirosHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPassageirosHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPassageirosHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
