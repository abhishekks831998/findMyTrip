import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient) { }

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
}
