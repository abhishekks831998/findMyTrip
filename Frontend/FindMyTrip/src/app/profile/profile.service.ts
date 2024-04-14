import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly APIUrl = "http://127.0.0.1:8000";

  private getHeaders(): HttpHeaders {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); // Ensure 'token' is the key you used to store the token

    // Return headers with the Authorization header if token exists
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token  // Assuming you're using Token authentication (e.g., Django Rest Framework Token)
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  constructor(private http:HttpClient) { }

  getProfileByID(pk: number | undefined){
    return this.http.get(this.APIUrl + '/register/'+pk+'/',);
  }
  updateProfile(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/register/'+pk+'/',val);
  }
}
