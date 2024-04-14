import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from "../profile.service";


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  @Input() myprofile: any;
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';

  getProfile() {
    var val = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
    };
    this.service.getProfile(val,this.id).subscribe(res => {
      alert(res.toString());
    });
  }

  constructor(private service: ProfileService) { }

  ngOnInit(): void {
    if (this.myprofile) {
      this.id = this.myprofile.id;
      this.first_name = this.myprofile.first_name;
      this.last_name = this.myprofile.last_name;
      this.username = this.myprofile.username;
      this.email = this.myprofile.email;
    }
  }


}
