import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authService/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../dialog-generic/dialog-generic.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
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

  logout(){
    this.authService.removeToken();
    this.router.navigate(["/"]);
  }
}
