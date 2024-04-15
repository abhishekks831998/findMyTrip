import { Component , OnInit} from '@angular/core';
import { SharedService } from "../../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent implements OnInit {
  package: any;
  allHotels:{[key:number]:any}= {};
  allFlights:{[key:number]:any}= {};
  allActivities:{[key:number]:any}= {};

  constructor(private service: SharedService, private router: Router) {
  }

  getActivityDetails(ID:number) {
    this.service.getActivityByID(ID).subscribe((data: object) => {
    this.allActivities[ID] = data;
    console.log(this.allActivities[ID])
    });

  }

  getFlightDetails(ID: number) {
    this.service.getFlightByID(ID).subscribe((data: object) => {
      this.allFlights[ID] = data;
    });

  }

  getHotelDetails(ID: number) {
    this.service.getHotelByID(ID).subscribe((data: object) => {
      this.allHotels[ID] = data;
    });

  }

  bookNow(TravelPack: any): void {
    this.router.navigate(['/book-package'], { queryParams: { packageInfo: JSON.stringify(TravelPack) } })
  }

  ngOnInit(): void {
    if (history.state) {
      this.package = history.state.data;
      for (let i = 0; i < this.package.flights.length; i++) {
        this.getFlightDetails(this.package.flights[i]);
      }
      for (let i = 0; i < this.package.hotels.length; i++) {
        this.getHotelDetails(this.package.hotels[i]);
      }
      for (let i = 0; i < this.package.activities.length; i++) {
        this.getActivityDetails(this.package.activities[i]);
      }
    }
  }
}
