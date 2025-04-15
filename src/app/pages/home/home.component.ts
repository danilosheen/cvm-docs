import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ButtonCardComponent } from "../../shared/components/button-card/button-card.component";
import { AuthService } from '../../core/services/authService/auth-service.service';
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NavbarComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FooterComponent,
    ButtonCardComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    if(!this.authService.getToken()){
      this.router.navigate(["/"]);
    }
  }
}
