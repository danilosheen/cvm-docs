import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonChangeLabelFontSizeComponent } from "./shared/components/button-change-label-font-size/button-change-label-font-size.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonChangeLabelFontSizeComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  router = inject(Router)
  title = 'cvm-project';
}
