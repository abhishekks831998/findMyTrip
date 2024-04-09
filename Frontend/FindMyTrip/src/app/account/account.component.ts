import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  Session = "";

  constructor(private router: Router) { }
  onLogin(): void {
    // Handle login logic here
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    // Handle register logic here
    this.router.navigate(['/register']);
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.Session = "Logout";
    }
    else {
      this.Session = "Login";
    }
  }

}
