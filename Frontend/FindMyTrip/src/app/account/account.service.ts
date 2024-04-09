import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

  getUserList(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/register/');
  }
  addUser(val:any){
    return this.http.post(this.APIUrl + '/register/',val);
  }
  updateUser(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/register/'+pk+'/',val);
  }
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.APIUrl + '/login/', credentials);
  }
  logout(){
    return this.http.post(this.APIUrl + '/logout/',null);
  }
}
