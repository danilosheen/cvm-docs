import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Input() placeholder: string = 'Pesquisar...';
  @Output() search = new EventEmitter<string>();

  inputValue: string = '';

  onInputChange() {
    this.search.emit(this.inputValue);
  }
}
