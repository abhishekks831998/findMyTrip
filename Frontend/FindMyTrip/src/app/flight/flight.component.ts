import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})

export class FlightComponent {

    flightForm: any = {};

    constructor(private http: HttpClient) { }

    onSubmit() {
      // Assuming you have a Django backend running at http://localhost:8000/api/hotels/
      this.http.post<any>('http://localhost:8000/api/flights/', this.flightForm)
        .subscribe(response => {
          console.log('Flight submitted successfully:', response);
          // Reset form after successful submission
          this.flightForm = {};
        }, error => {
          console.error('Error submitting flight:', error);
        });
    }
}
