import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() login: any;
  user_name: string = '';
  password: string = '';
  isButtonDisabled = false; // Added flag to disable the button
  button_name = "Log In"// Add a button name
  flag = false;


  constructor(private router: Router, private service: AccountService) {} // Inject the router in the constructor

  onSubmit() {
    if (this.flag) {
      this.button_name = "Log In"
      this.user_name = '';
      this.password = '';
      this.flag = false;
      console.log('Log Out');
      this.service.logout().subscribe(res => {
        if (res) {
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
          console.log(res);
        }
      });
    } else {
      let auth = {
        username: this.user_name,
        password: this.password
      }
      this.service.login(auth).subscribe(res => {
        if (res) {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.isButtonDisabled = false; // Disable the button after successful login
            this.button_name = "Logg Out" // Change the button text after successful login
            this.flag = true;
          }
        }
      });
      }
  }

  goToRegister() {
    this.router.navigate(['/register']); // This should navigate to your register component
  }
  onForgotPassword() {
    console.log('Forgot password clicked');
  }
}
