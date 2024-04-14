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
interface Diff {
  [key: string]: any;
}

@Component({
  selector: 'app-add-edit-packages',
  templateUrl: './add-edit-packages.component.html',
  styleUrl: './add-edit-packages.component.css'
})

export class AddEditPackagesComponent implements OnInit {

  @Input() package: any;
  packageCopy: {}  | undefined;
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  duration_in_days: number | undefined;
  hotels: number[] | [] | undefined;
  flights: number[] | [] | undefined;
  activities: number[] | undefined;
  image: File | undefined;
  selectedHotels: number[] = [];
  selectedFlights: number[] = [];
  selectedActivities: number[] = [];
  hotelsDict: any | {} | undefined;
  flightsDict: any | {} | undefined;
  activitiesDict: any | {} | undefined;
  userID = 0;

  constructor(private service: PackageService) {
  }

  addPackage() {
    if (localStorage.getItem('isStaff') == "false") {
      console.log("You are not authorized to add a package");
      this.userID = parseInt(localStorage.getItem('userId') || '0', 10);
    }
    var add = {
      id: this.id,
      name: this.name,
      description: this.description,
      duration_in_days: this.duration_in_days,
      hotels: this.selectedHotels,
      flights: this.selectedFlights,
      activities: this.selectedActivities,
      image: this.image,
      created_by: this.userID
    };
    console.log(add);
    this.service.addPackage(add).subscribe(res => {
      alert(res.toString());
    });
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

  getObjectDiff(obj1: any, obj2: any): any {
    const diff: any = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj2.hasOwnProperty(key)) {
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    const subDiff = this.getObjectDiff(obj1[key], obj2[key]);
                    if (Object.keys(subDiff).length > 0) {
                        diff[key] = obj2[key];
                    }
                } else if (obj1[key] !== obj2[key]) {
                    diff[key] = obj2[key];
                }
            } else {
                diff[key] = obj1[key];
            }
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
            diff[key] = obj2[key];
        }
    }

    return diff;
}

arrayToInt(arr: any[]): number[] {
  return arr.map(item => parseInt(item, 10));
}

updatePackage() {
    var update = {
      id: this.id,
      name: this.name,
      description: this.description,
      duration_in_days: this.duration_in_days,
      hotels: this.selectedHotels,
      flights: this.selectedFlights,
      activities: this.selectedActivities,
    };
    var diff : Diff = this.getObjectDiff(this.packageCopy,update);
    delete diff["image"];
    if(diff['hotels']){
      diff['hotels'] = this.arrayToInt(diff['hotels']);
    }
    if(diff['flights']){
      diff['flights'] = this.arrayToInt(diff['flights']);
    }
    if(diff['activities']){
      diff['activities'] = this.arrayToInt(diff['activities']);
    }
    var temp = JSON.parse(JSON.stringify(this.packageCopy));
    for (const key in diff) {
      temp[key] = diff[key];
    }


    const formData = new FormData();
    formData.append('id', temp.id);
    formData.append('name', temp.name);
    formData.append('description', temp.description);
    formData.append('duration_in_days', temp.duration_in_days);
    formData.append('hotels', temp.hotels);
    formData.append('flights', temp.flights);
    formData.append('activities', temp.activities);
    formData.append('created_by', temp.created_by);
    for (const key in diff) {
      formData.append(key,diff[key]);
    }
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    this.service.updatePackage(formData, this.id).subscribe(res => {
      alert(res.toString());
    });
  }

  onFileSelected(event:Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.image = file;
    }


  ngOnInit(): void {
      this.fetchAll();
    if (this.package && this.package.id !== 0) {
      this.packageCopy = JSON.parse(JSON.stringify(this.package));
      this.id = this.package.id;
      this.name = this.package.name;
      this.description = this.package.description;
      this.duration_in_days = this.package.duration_in_days;
      //this.image = this.package.image;
      this.selectedHotels = this.package.hotels;
      this.hotels= this.selectedHotels;
      this.selectedFlights = this.package.flights;
      this.flights = this.selectedFlights;
      this.selectedActivities = this.package.activities;
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

