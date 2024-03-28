import { Component, OnInit, Input } from '@angular/core';
import {PackageService} from "../package.service";
import {of} from "rxjs";

interface Hotel {
  name: string;
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
  flights : any[] | [] | undefined;
  activities : any[] | undefined;
  image: string | undefined;
  selectedHotelsText = '';
  selectedHotels: Hotel[] = [];

  constructor(private service: PackageService) { }

  addPackage() {
    var add = {
      id: this.id,
      name: this.name,
      description: this.description,
      duration_in_days: this.duration_in_days,
      hotels: this.hotels,
      flights: this.flights,
      activities: this.activities,
      image: this.image
    };
    console.log(add);
    // this.service.addPackage(add).subscribe(res => {
    //   alert(res.toString());
    // });
  }

   onHotelSelected(event:any): void {
    const selectedHotelName = event.target.value;
    console.log(selectedHotelName);
    if (selectedHotelName && !this.selectedHotels.includes(selectedHotelName)) {
      this.selectedHotels.push(selectedHotelName);
      this.selectedHotelsText += (this.selectedHotelsText ? ', ' : '') + selectedHotelName;
      console.log(this.selectedHotelsText);
    }
  }
  removeHotel(index: number): void {
  this.selectedHotels.splice(index, 1);
  this.updateSelectedHotelsText();
  }

  updateSelectedHotelsText(): void {
    this.selectedHotelsText = this.selectedHotels.join(', ');
    console.log(this.selectedHotelsText);
  }

  onSubmit() {
    if (this.package.id === 0) {
      this.addPackage();
    } else {
      this.updatePackage();
    }
  }

    updatePackage(){
      var update = {id:this.id,
                name:this.name,
                description:this.description,
                duration_in_days:this.duration_in_days,
                hotels:this.hotels,
                flights:this.flights,
                activities:this.activities,
                image:this.image};
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
    this.id = this.package.id;
    this.name = this.package.name;
    this.description = this.package.description;
    this.duration_in_days = this.package.duration_in_days;
    this.flights = this.package.flights;
    this.activities = this.package.activities;
    this.image = this.package.image;
    this.flights = this.package.flights;
    this.activities = this.package.activities;
    this.hotels = this.package.hotels;


    this.getHotels();
    this.getFlights();
    this.getActivities();
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
