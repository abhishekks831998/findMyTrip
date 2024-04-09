import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})

export class AccountComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  Session = "";

  constructor(private router: Router, private accountService: AccountService) { }
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
    this.updateSessionState();
  }

   updateSessionState() {
    if (localStorage.getItem('token')) {
      this.Session = "Logout";
    } else {
      this.Session = "Login";
    }
  }
  onSessionButtonClick(): void {
    if (this.Session === "Logout") {
      // Perform logout
      this.accountService.logout().subscribe(() => {
        localStorage.removeItem('token');
        this.updateSessionState();
        this.router.navigate(['/home']); // Navigate to home after logout
      }, error => {
        // Handle error here, for example, logging the error or showing a message
      });
    } else {
      // Navigate to login
      this.router.navigate(['/login']);
    }
  }

}
