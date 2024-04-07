import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj = {
    user_name: '',
    password: '',
    type: 'user' // default to 'user'

  };

  onSubmit() {
    console.log('Login Type saved:', this.loginObj.type)
  };

  constructor(private router: Router) {} // Inject the router in the constructor

  goToRegister() {
    this.router.navigate(['/register']); // This should navigate to your register component
  }
  onForgotPassword() {
    console.log('Forgot password clicked');
  }
}
