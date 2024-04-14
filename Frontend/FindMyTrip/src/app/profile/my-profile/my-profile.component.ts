import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from "../profile.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']  // Corrected property name
})
export class MyProfileComponent implements OnInit {
  @Input() myprofile: any;
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';

  constructor(private profileService: ProfileService) {}  // Correctly injected service

  ngOnInit(): void {
    if (this.myprofile) {
      this.id = this.myprofile.id;
      this.first_name = this.myprofile.first_name;
      this.last_name = this.myprofile.last_name;
      this.username = this.myprofile.username;
      this.email = this.myprofile.email;
    }
  }

  getProfile() {
    const val = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
    };
    this.profileService.getProfile(val, this.id).subscribe(res => {
      alert(res.toString());
    });
  }
}
