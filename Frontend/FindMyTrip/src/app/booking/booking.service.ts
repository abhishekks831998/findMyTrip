import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseURL = 'http://127.0.0.1:8000/bookings/';
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

  submitBooking(formData: any): Observable<any> {
    return this.http.post<any>(this.baseURL, formData, { headers: this.headers });
  }

  getBookingDetails(bookingId: String): Observable<any> {
    return this.http.get<any>(this.baseURL+bookingId, { headers: this.headers });
  }
}
