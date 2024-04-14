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
  password: string = localStorage.getItem('password') || '';
  userID: number = Number(localStorage.getItem('userId'));
  constructor(private profileService: ProfileService) {}  // Correctly injected service

  ngOnInit(): void {
    this.getProfileByID(this.userID);
  }

  getProfileByID(pk: number): void {
    if (localStorage.getItem('token')){
      this.profileService.getProfileByID(pk).subscribe({
        next: (response) => {
          this.myprofile = response;
          this.id = this.myprofile.id;
          this.first_name = this.myprofile.first_name;
          this.last_name = this.myprofile.last_name;
          this.username = this.myprofile.username;
          this.email = this.myprofile.email;
        },
        error: (err) => alert('Failed to retrieve profile: ' + err)
      });
    }
  }
  onUpdate(): void {
    if (localStorage.getItem('token')){
      this.myprofile = {
        id: this.userID,
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
      }
      this.profileService.updateProfile(this.myprofile, this.userID).subscribe({
        next: (response) => {
          alert('Profile updated successfully');
        },
        error: (err) => alert('Failed to update profile: ' )
      });
    }
  }
}
