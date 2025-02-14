import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-orcamento',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent {

}
