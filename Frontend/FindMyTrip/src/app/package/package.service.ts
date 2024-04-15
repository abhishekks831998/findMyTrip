import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

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

  private getFormHeaders(): HttpHeaders {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); // Ensure 'token' is the key you used to store the token

    // Return headers with the Authorization header if token exists
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Token ' + token,  // Assuming you're using Token authentication (e.g., Django Rest Framework Token)
        'Accept': 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  getPackageList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/packages/', { headers: this.getHeaders() });
  }

  getPackage(packageId: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/packages/'+packageId, { headers: this.getHeaders() });
  }

  addPackage(val: any) {
    const formData = new FormData();
    formData.append('name', val.name);
    formData.append('description', val.description);
    formData.append('duration_in_days', val.duration_in_days);
    formData.append('hotels', val.hotels);
    formData.append('flights', val.flights);
    formData.append('activities', val.activities);
    formData.append('created_by', val.created_by);
    if(val.image)
    formData.append('image', val.image, val.image.name);
    return this.http.post(this.APIUrl + '/packages/', formData, { headers: this.getFormHeaders() });
  }

  updatePackage(val: any, pk: number | undefined) {
    return this.http.put(this.APIUrl + '/packages/' + pk + '/', val, { headers: this.getFormHeaders() });
  }

  deletePackage(val: any) {
    return this.http.delete(this.APIUrl + '/packages/' + val, { headers: this.getHeaders() });
  }

  getHotelList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/hotels/', { headers: this.getHeaders() });
  }

  getFlightList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/flights/', { headers: this.getHeaders() });
  }

  getActivityList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/activities/', { headers: this.getHeaders() });
  }
}
