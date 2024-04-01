import { Component, OnInit, Input } from '@angular/core';
import {PackageService} from "../package.service";
import {of} from "rxjs";

interface Hotel {
  id: number;
  name: string;
}
interface Flight {
  id: number;
  flight_number: string;
  airline: string;
}
interface Activity {
  id: number;
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
  hotels : number[] | [] | undefined;
  flights : number[] | [] | undefined;
  activities : number[] | undefined;
  image: string | undefined;
  selectedHotels : number[] = [];
  selectedFlights : number[] = [];
  selectedActivities : number[] = [];
  hotelsDict: any | {} | undefined;
  flightsDict: any | {} | undefined;
  activitiesDict: any | {} | undefined;

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
    // this.service.addPackage(add,this.image).subscribe(res => {
    //   alert(res.toString());
    // });
  }
   onHotelSelected(event: any): void {
     let ID: number = event.target.value;
     if (ID && !this.selectedHotels.includes(ID)) {
       this.selectedHotels.push(ID);
     }
   }
  onFlightSelected(event: any): void {
    let ID: number = event.target.value;
    if (ID && !this.selectedFlights.includes(ID)) {
      this.selectedFlights.push(ID);
    }
  }
  onActivitySelected(event: any): void {
    let ID: number = event.target.value;
    if (ID && !this.selectedActivities.includes(ID)) {
      this.selectedActivities.push(ID);
    }
  }

  removeFlight(flightID: number): void {
    this.selectedFlights = this.selectedFlights.filter(id => id !== flightID);

  }
  removeActivity(activityID: number): void {
    this.selectedActivities = this.selectedActivities.filter(id => id !== activityID);
  }
  removeHotel(hotelID: number): void {
    this.selectedHotels = this.selectedHotels.filter(id => id !== hotelID);
  }

  onSubmit() {
    if (this.package.id === 0) {
      this.addPackage();
    } else {
      this.updatePackage();
    }
  }

    updatePackage() {
      const formData = new FormData();
      formData.append('id', this.package.id);
      formData.append('name', this.package.name);
      formData.append('description', this.package.description);
      formData.append('duration_in_days', this.package.duration_in_days);
      formData.append('hotels', JSON.stringify(this.selectedHotels));
      formData.append('flights', JSON.stringify(this.selectedFlights));
      formData.append('activities', JSON.stringify(this.selectedActivities));

      if (this.package.image instanceof File) {
        formData.append('image', this.package.image, this.package.image.name);
      }

      console.log(formData);
      this.service.updatePackage(formData,this.id).subscribe(res => {
        alert(res.toString());
      });
    }

    convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });
}

    onFileSelected(event: Event): void {
    // @ts-ignore
      if (event > 0) {
      const imageFile = event.target.files[0];
      this.convertFileToBase64(imageFile).then(base64Image => {
        this.image = base64Image;  // Now this.image contains the Base64 string
    });
}

  ngOnInit(): void {
      this.fetchAll();
    if (this.package && this.package.id !== 0) {
      this.id = this.package.id;
      this.name = this.package.name;
      this.description = this.package.description;
      this.duration_in_days = this.package.duration_in_days;
      this.image = this.package.image;
      this.hotels = this.selectedHotels;
      this.flights = this.selectedFlights;
      this.activities = this.selectedActivities;
    }
  }

  fetchAll(){
    this.getHotels();
    this.getFlights();
    this.getActivities();
  }

  getHotels(){
    this.service.getHotelList().subscribe(data=>{
      let hotels = JSON.stringify(data);
      let hotelList = JSON.parse(hotels);
      console.log(hotelList.results);
      this.hotelsDict = hotelList.results;
    });
  }
  getFlights(){
    this.service.getFlightList().subscribe(data=>{
      let flights = JSON.stringify(data);
      let flightList = JSON.parse(flights);
      console.log(flightList.results);
      this.flightsDict = flightList.results;
    });
  }
  getActivities(){
    this.service.getActivityList().subscribe(data=>{
      let activities = JSON.stringify(data);
      let activityList = JSON.parse(activities);
      console.log(activityList.results);
      this.activitiesDict = activityList.results;
    });
  }
}

