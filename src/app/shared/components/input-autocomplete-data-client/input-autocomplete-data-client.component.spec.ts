import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteDataCLientComponent } from './input-autocomplete-data-client.component';

describe('InputAutocompleteDataCLientComponent', () => {
  let component: InputAutocompleteDataCLientComponent;
  let fixture: ComponentFixture<InputAutocompleteDataCLientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutocompleteDataCLientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAutocompleteDataCLientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
