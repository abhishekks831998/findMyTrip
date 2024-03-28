import { Component, OnInit, Input } from '@angular/core';
import {PackageService} from "../package.service";
import {of} from "rxjs";

interface Hotel {
  name: string;
}
interface Flight {
  flight_number: string;
  airline: string;
}
interface Activity {
  title: string;
}

@Component({
  selector: 'app-add-edit-packages',
  templateUrl: './add-edit-packages.component.html',
  styleUrl: './add-edit-packages.component.css'
})
export class AddEditPackagesComponent implements OnInit{
  @Input() package: any;
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  duration_in_days: number | undefined;
  hotels : Hotel[] | [] | undefined;
  flights : Flight[] | [] | undefined;
  activities : Activity[] | undefined;
  image: string | undefined;
  selectedHotelsText = '';
  selectedFlightsText = '';
  selectedActivitiesText = '';
  selectedHotels: { [key: string]: boolean } = {};
  selectedFlights: { [key: string]: boolean } = {};
  selectedActivities: { [key: string]: boolean } = {};

  constructor(private service: PackageService) { }

  addPackage() {
    var add = {
      id: this.id,
      name: this.name,
      description: this.description,
      duration_in_days: this.duration_in_days,
      hotels: this.selectedHotels,
      flights: this.selectedFlights,
      activities: this.selectedActivities,
      image:this.image
    };
    console.log(add);
    this.service.addPackage(add,this.image).subscribe(res => {
      alert(res.toString());
    });
  }

   onHotelSelected(event: any): void {
     const selectedHotelName = event.target.value;
     if (selectedHotelName && !this.selectedHotels[selectedHotelName]) {
       this.selectedHotels[selectedHotelName] = true;
       this.selectedHotelsText = Object.keys(this.selectedHotels).join(', ');
     }
   }
  onFlightSelected(event: any): void {
    const selectedFlightName = event.target.value;
    if (selectedFlightName && !this.selectedFlights[selectedFlightName]) {
      this.selectedFlights[selectedFlightName] = true;
      this.selectedFlightsText = Object.keys(this.selectedFlights).join(', ');
    }
  }
  onActivitySelected(event: any): void {
    const selectedActivityName = event.target.value;
    if (selectedActivityName && !this.selectedActivities[selectedActivityName]) {
      this.selectedActivities[selectedActivityName] = true;
      this.selectedActivitiesText = Object.keys(this.selectedActivities).join(', ');
    }
  }
  removeActivity(activityName: string): void {
    if (this.selectedActivities[activityName]) {
      delete this.selectedActivities[activityName];
      this.selectedActivitiesText = Object.keys(this.selectedActivities).join(', ');
    }
  }
  removeFlight(flightName: string): void {
    if (this.selectedFlights[flightName]) {
      delete this.selectedFlights[flightName];
      this.selectedFlightsText = Object.keys(this.selectedFlights).join(', ');
    }
  }
  removeHotel(hotelName: string): void {
  delete this.selectedHotels[hotelName]; // Remove the hotel from the selection
  // Update the text representation if needed
  }

  onSubmit() {
    if (this.package.id === 0) {
      this.addPackage();
    } else {
      this.updatePackage();
    }
  }

    updatePackage(){
      const hotelNames = Object.entries(this.selectedHotels)
                           .filter(([_, isSelected]) => isSelected)
                           .map(([name, _]) => name);
      const activityNames = Object.entries(this.selectedActivities)
                            .filter(([_, isSelected]) => isSelected)
                            .map(([name, _]) => name);
      const flightNames = Object.entries(this.selectedFlights)
                            .filter(([_, isSelected]) => isSelected)
                            .map(([name, _]) => name);

      var update = {id:this.id,
                name:this.name,
                description:this.description,
                duration_in_days:this.duration_in_days,
                hotels:hotelNames,
                flights:flightNames,
                activities:activityNames,
                image:this.image
        };
      console.log(update);
      this.service.updatePackage(update,this.id).subscribe(res=>{
        alert(res.toString());
      });
    }
    onFileSelected(event: Event): void {
    // @ts-ignore
      const file:File = Event.files[0];
        if (file) {
          this.image = file.name;
        }
}

  ngOnInit(): void {
    if (this.package && this.package.id !== 0) {
      this.id = this.package.id;
      this.name = this.package.name;
      this.description = this.package.description;
      this.duration_in_days = this.package.duration_in_days;
      this.image = this.package.image;

      // Convert the received dictionaries for hotels, flights, and activities to arrays for internal component usage
      this.selectedHotels = this.package.hotels || {};
      this.selectedFlights = this.package.flights || {};
      this.selectedActivities = this.package.activities || {};

      // Convert the dictionaries to text representations for display
      this.selectedHotelsText = this.getSelectedText(this.selectedHotels);
      this.selectedFlightsText = this.getSelectedText(this.selectedFlights);
      this.selectedActivitiesText = this.getSelectedText(this.selectedActivities);
    }

    // Fetch lists of possible hotels, flights, and activities
    this.getHotels();
    this.getFlights();
    this.getActivities();
  }

  getSelectedText(selectedItems: { [key: string]: boolean }): string {
    return Object.keys(selectedItems)
      .filter(key => selectedItems[key])
      .join(', ');
  }

  getHotels(){
    this.service.getHotelList().subscribe(data=>{
      let hotels = JSON.stringify(data);
      let hotelList = JSON.parse(hotels);
      this.hotels = hotelList.results;
    });
  }
  getFlights(){
    this.service.getFlightList().subscribe(data=>{
      let flights = JSON.stringify(data);
      let flightList = JSON.parse(flights);
      this.flights = flightList.results;
    });
  }
  getActivities(){
    this.service.getActivityList().subscribe(data=>{
      let activities = JSON.stringify(data);
      let activityList = JSON.parse(activities);
      this.activities = activityList.results;
    });
  }
}
