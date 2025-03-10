import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-lista-passageiros',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './lista-passageiros.component.html',
  styleUrl: './lista-passageiros.component.css'
})
export class ListaPassageirosComponent {

}
