import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user_name: string = '';
  password: string = '';
  isButtonDisabled = false;
  button_name = "Log In";
  isLoggedIn = false; // Renamed for clarity
  showErrorModal: boolean = false; // For controlling error modal visibility

  constructor(private router: Router, private service: AccountService) {}

  onSubmit() {
    if (this.isLoggedIn) {
      this.logOut();
    } else {
      this.logIn();
    }
  }

  logIn() {
    const auth = {
      username: this.user_name,
      password: this.password
    };
    this.service.login(auth).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorModal = true; // Consider implementing a modal or toast notification instead of alert
        return of(null); // Handle the error and prevent further processing
      })
    ).subscribe(res => {
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isStaff', res.user.is_staff);
        this.isLoggedIn = true;
        this.router.navigate(['/account']);
      }
    });
  }

  logOut() {
    this.service.logout().subscribe(res => {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });
  }

  closeModal() {
    this.showErrorModal = false;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
