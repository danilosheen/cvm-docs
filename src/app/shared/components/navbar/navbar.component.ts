import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authService/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubjectService } from '../../../core/services/behaviorSubjectService/behavior-subject.service';
import { NgIf } from '@angular/common';
import { PermissaoService } from '../../../core/services/permissaoService/permissao.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgIf
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  readonly dialog: MatDialog = inject(MatDialog);
  authService = inject(AuthService);
  router = inject(Router);
  permissaoService = inject(PermissaoService);
  permissoes: string[] = [];

  constructor(){}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Sair',
        dialogContent: 'Você tem certeza que deseja sair?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.logout();
      }
    });
  }

  abrirTelaOrcamentoHistory(){
    this.router.navigate(['/orcamento-history']);
  }

  abrirTelaListaPassageirosHistory(){
    this.router.navigate(['/lista-passageiros-history']);
  }

  abrirTelaContratosHistory(){
    this.router.navigate(['/contrato-history']);
  }

  abrirTelaGerenciarUsuarios(){
    this.router.navigate(['/gerenciar-usuarios']);
  }

  logout(){
    this.authService.removeToken();
    localStorage.removeItem('permissoes');
    this.router.navigate(["/"]);
  }

  temPermissao(modulo: string): boolean {
    return this.authService.temPermissao(modulo);
  }
}
