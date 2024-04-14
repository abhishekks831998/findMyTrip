import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  getProfile(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/register/'+pk+'/',val);
  }
}
