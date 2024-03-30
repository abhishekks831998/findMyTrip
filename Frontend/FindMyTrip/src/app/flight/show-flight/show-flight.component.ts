import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-flight',
  templateUrl: './show-flight.component.html',
  styleUrl: './show-flight.component.css'
})
export class ShowFlightComponent implements OnInit{
ModalTitle: any;

  constructor(private service:SharedService, private cdRef: ChangeDetectorRef) { }

  FlightList:any=[];
  ModelTitle: string | undefined;
  ActivateAddEditFlightComponent:boolean=false;
  flight:any;

  ngOnInit() : void {
    this.refreshFlightList()
  }

  addClick(){
    this.flight = {
      id:0,
      flight_number:"",
      airline:"",
    }
    this.ModelTitle = "Add Flight";
    this.ActivateAddEditFlightComponent = true;
  }
  editClick(item: any){
    this.flight = item;
    this.ModelTitle = "Edit Flight";
    this.ActivateAddEditFlightComponent = true;
  }

  closeClick(){
    this.ActivateAddEditFlightComponent = false;
    this.refreshFlightList();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.service.deleteFlight(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshFlightList();
        this.cdRef.detectChanges()
      });
    }
  }

  refreshFlightList(){
    this.service.getFlightList().subscribe(data=>{
       let flights = JSON.stringify(data);
        let flightList = JSON.parse(flights);
          this.FlightList = flightList.results;
    });
  }
}


