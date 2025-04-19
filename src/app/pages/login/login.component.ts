import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/loginService/login-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';
import { LoadingComponent } from "../../shared/components/loading/loading.component";


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgClass,
    LoadingComponent,
    NgIf
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
  isLoading: boolean = false

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ){
    if(this.authService.getToken()){
      this.router.navigate(["/home"]);
    }

    const email = localStorage.getItem("email");
    if(email){
      this.email = email;
    }
  }

  login(){
    this.isLoading = true;
    this.loginService.login(this.email, this.senha).subscribe({
      next: (result) => {
        if (result.token) {
          localStorage.setItem("email", this.email);
          this.router.navigate(["/home"]);
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.error.toLowerCase();
        setTimeout(()=>{
          this.errorMessage = '';
        }, 5000)
      }
    });
  }

  togglePassword(event: Event){
    event.preventDefault();
    event.stopImmediatePropagation();
    this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) {
    this.login();
  }

  showErro(){
    if(this.errorMessage){
      return true;
    }
    return false;
  }
}
