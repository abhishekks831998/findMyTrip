import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Input() register: any;
  id: number | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  is_staff: boolean | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private service: AccountService) {
  }

  registeruser() {
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
