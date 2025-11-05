import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { PermissaoService } from '../../core/services/permissaoService/permissao.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ButtonCardComponent } from "../../shared/components/button-card/button-card.component";
import { NgIf } from '@angular/common';
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FooterComponent,
    ButtonCardComponent,
    NgIf,
    LoadingBlueComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  permissoes: string[] = [];
  permissoesBehaviorSubject = inject(BehaviorSubjectService);
  isLoadingPermissoes = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private permissaoService: PermissaoService
  ) {}

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/']);
      return;
    }

    this.isLoadingPermissoes = true;
    this.permissaoService.getPermissoes().subscribe({
      next:(permissoes) => {
        this.permissoes = permissoes
          .filter(p=> p.permitido)
          .map(p => p.modulo);
          this.isLoadingPermissoes = false;
          localStorage.setItem('permissoes', JSON.stringify(this.permissoes));
      },
      error:(error) => {
        this.isLoadingPermissoes = false;
        console.log(error);
      }
    });
  }

  temPermissao(modulo: string): boolean {
    return this.permissoes.includes(modulo);
  }
}
