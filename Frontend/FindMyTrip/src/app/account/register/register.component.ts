import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Input() register: any;
  id : number  = 0;
  first_name: string  = '';
  last_name: string  = '';
  is_staff: boolean = false
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private service: AccountService) {
  }

  registerUser() {
    var val = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      is_staff: this.is_staff,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // this.service.addUser(val).subscribe(res => {
    //   alert(res.toString());
    // });
    console.log(val);

  }
    ngOnInit(): void {
        this.id = this.register.id;
        this.first_name = this.register.first_name;
        this.last_name = this.register.last_name;
        this.is_staff = this.register.is_staff;
        this.username = this.register.username;
        this.email = this.register.email;
        this.password = this.register.password;
  }
}
