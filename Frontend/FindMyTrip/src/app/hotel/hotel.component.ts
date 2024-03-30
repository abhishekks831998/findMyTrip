import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent {

    hotelForm: any = {};

    constructor(private http: HttpClient) { }

    onSubmit() {
      // Assuming you have a Django backend running at http://localhost:8000/api/hotels/
      this.http.post<any>('http://localhost:8000/api/hotels/', this.hotelForm)
        .subscribe(response => {
          console.log('Hotel submitted successfully:', response);
          // Reset form after successful submission
          this.hotelForm = {};
        }, error => {
          console.error('Error submitting hotel:', error);
        });
    }
}
