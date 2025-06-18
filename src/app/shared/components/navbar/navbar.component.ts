import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authService/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../dialog-generic/dialog-generic.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  readonly dialog: MatDialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

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

  logout(){
    this.authService.removeToken();
    this.router.navigate(["/"]);
  }
}
