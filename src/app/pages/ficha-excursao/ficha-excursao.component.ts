import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-ficha-excursao',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './ficha-excursao.component.html',
  styleUrl: './ficha-excursao.component.css'
})
export class FichaExcursaoComponent {

}
