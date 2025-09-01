import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonChangeLabelFontSizeComponent } from "./shared/components/button-change-label-font-size/button-change-label-font-size.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonChangeLabelFontSizeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cvm-project';
}
