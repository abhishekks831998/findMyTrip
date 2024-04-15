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

  submitBooking(formData: any): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:8000/package-booking/", formData, { headers: this.getHeaders() });
  }

  getBookings(): Observable<any> {
    return this.http.get<any>("http://127.0.0.1:8000/package-booking/", { headers: this.getHeaders() });
  }

  getBookingDetails(bookingId: String): Observable<any> {
    return this.http.get<any>(this.baseURL+bookingId, { headers: this.getHeaders() });
  }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(this.baseURL, { headers: this.getHeaders() });
  }
  deleteBooking(val:any){
    return this.http.delete("http://127.0.0.1:8000/cancel-package-booking/" +val, { headers: this.getHeaders() });
  }
}
