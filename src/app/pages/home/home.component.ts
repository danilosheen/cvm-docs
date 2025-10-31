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
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  permissoes: string[] = [];
  permissoesBehaviorSubject = inject(BehaviorSubjectService);

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

    this.permissaoService.getPermissoes().subscribe({
            next:(permissoes) => {
              this.permissoes = permissoes
                .filter(p=> p.permitido)
                .map(p => p.modulo);
                this.permissoesBehaviorSubject.setPermissoes(this.permissoes);
            },
            error:(error) => {
              console.log(error);
            }
          });
  }

  temPermissao(modulo: string): boolean {
    return this.permissoes.includes(modulo);
  }
}
