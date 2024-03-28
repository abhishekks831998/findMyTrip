import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  headers: any;
  constructor(private http: HttpClient) {
    const username = 'root'; // Replace 'login' with your actual username
    const password = 'root'; // Replace 'password' with your actual password
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    // Define HTTP headers with the authentication header
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authHeader
    });
  }

  getPackageList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/packages/',{ headers: this.headers });
  }
  addPackage(val:any, image: any){
    const formData = new FormData();
    for (const key in val) {
    if (val.hasOwnProperty(key)) {
      formData.append(key, val[key]);
    }
  }
    if (image) {
    formData.append('image', image, image.name);
  }
    console.log(formData);
    return this.http.post(this.APIUrl + '/packages/',formData,{ headers: this.headers });
  }
  updatePackage(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/packages/'+pk+'/',val,{ headers: this.headers });
  }
  deletePackage(val:any){
    return this.http.delete(this.APIUrl + '/packages/'+val,{ headers: this.headers });
  }

  getHotelList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/hotels/',{ headers: this.headers });
  }
  getFlightList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/flights/',{ headers: this.headers });
  }
  getActivityList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/activities/',{ headers: this.headers });
  }
}
