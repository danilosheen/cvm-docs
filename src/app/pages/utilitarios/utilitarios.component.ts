import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ButtonCardComponent } from "../../shared/components/button-card/button-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-utilitarios',
  imports: [NavbarComponent, FooterComponent, ButtonCardComponent, RouterLink],
  templateUrl: './utilitarios.component.html',
  styleUrl: './utilitarios.component.css'
})
export class UtilitariosComponent {

}
