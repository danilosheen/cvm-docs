import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NavbarComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
