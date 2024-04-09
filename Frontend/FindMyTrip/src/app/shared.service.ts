import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

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

  searchFlights(query: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/flights/?search=${query}`);
  }
  searchHotels(query: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/hotels/?search=${query}`);
  }
  searchactivities(query: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + `/activities/?search=${query}`);
  }
  getHotelList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/hotels/');
  }
  addHotel(val:any){
    return this.http.post(this.APIUrl + '/hotels/',val,{ headers: this.getHeaders() });
  }
  updateHotel(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/hotels/'+pk+'/',val,{ headers: this.getHeaders() });
  }
  deleteHotel(val:any){
    return this.http.delete(this.APIUrl + '/hotels/'+val, { headers: this.getHeaders() });
  }
  getFlightList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/flights/');
  }
  addFlight(val:any){
    return this.http.post(this.APIUrl + '/flights/',val,{ headers: this.getHeaders() });
  }
  updateFlight(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/flights/'+pk+'/',val,{ headers: this.getHeaders() });
  }
  deleteFlight(val:any){
    return this.http.delete(this.APIUrl + '/flights/'+val,{ headers: this.getHeaders() });
  }
  getActivityList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/activities/');
  }
  addActivity(val:any){
    return this.http.post(this.APIUrl + '/activities/',val,{ headers: this.getHeaders() });
  }
  updateActivity(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/activities/'+pk+'/',val,{ headers: this.getHeaders() });
  }
  deleteActivity(val:any){
    return this.http.delete(this.APIUrl + '/activities/'+val,{ headers: this.getHeaders() });
  }
}
