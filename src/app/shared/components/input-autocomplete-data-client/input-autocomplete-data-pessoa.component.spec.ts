import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteDataPessoaComponent } from './input-autocomplete-data-pessoa.component';

describe('InputAutocompleteDataPessoaComponent', () => {
  let component: InputAutocompleteDataPessoaComponent;
  let fixture: ComponentFixture<InputAutocompleteDataPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutocompleteDataPessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAutocompleteDataPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
