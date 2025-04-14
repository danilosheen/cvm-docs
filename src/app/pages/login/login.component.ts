import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/loginService/login-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  token: string = '';
  errorMessage: string = ''
  typePassword: string = 'password';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ){
    if(this.authService.getToken()){
      this.router.navigate(["/home"]);
    }
  }

  login(){
    this.loginService.login(this.email, this.senha).subscribe({
      next: (result) => {
        if (result.token) {
          this.router.navigate(["/home"]);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.error.toLowerCase();
        setTimeout(()=>{
          this.errorMessage = '';
        }, 5000)
      }
    });
  }

  togglePassword(event: Event){
    event.stopImmediatePropagation();
    this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
  }

  showErro(){
    if(this.errorMessage){
      return true;
    }
    return false;
  }
}
