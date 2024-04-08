import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }


  searchFlights(query: any): Observable<any> {
    // Implement HTTP request to backend API to search flights
    return this.http.get<any>(this.APIUrl + `/flights/?search=${query}`);
  }
  //http://127.0.0.1:8000/flights/?flight_number=3&airline=

  searchHotels(query: any): Observable<any> {
    // Implement HTTP request to backend API to search flights
    return this.http.get<any>(this.APIUrl + `/hotels/?search=${query}`);
  }
  //http://127.0.0.1:8000/flights/?flight_number=3&airline=
  searchactivities(query: any): Observable<any> {
    // Implement HTTP request to backend API to search flights
    return this.http.get<any>(this.APIUrl + `/activities/?search=${query}`);
  }
  getHotelList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/hotels/');
  }
  addHotel(val:any){
    return this.http.post(this.APIUrl + '/hotels/',val);
  }
  updateHotel(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/hotels/'+pk+'/',val);
  }
  deleteHotel(val:any){
    return this.http.delete(this.APIUrl + '/hotels/'+val);
  }

  getAllHotelNames():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/hotels/');
  }
   getFlightList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/flights/');
  }
  addFlight(val:any){
    return this.http.post(this.APIUrl + '/flights/',val);
  }
  updateFlight(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/flights/'+pk+'/',val);
  }
  deleteFlight(val:any){
    return this.http.delete(this.APIUrl + '/flights/'+val);
  }

  getAllFlightNames():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/flights/');
  }
  getActivityList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/activities/');
  }
  addActivity(val:any){
    return this.http.post(this.APIUrl + '/activities/',val);
  }
  updateActivity(val: any, pk: number | undefined){
    return this.http.put(this.APIUrl + '/activities/'+pk+'/',val);
  }
  deleteActivity(val:any){
    return this.http.delete(this.APIUrl + '/activities/'+val);
  }

  getAllActivityNames():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/activities/');
  }
}
