import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-hotel',
  templateUrl: './show-hotel.component.html',
  styleUrl: './show-hotel.component.css'
})
export class ShowHotelComponent implements OnInit{

  constructor(private service:SharedService, private cdRef: ChangeDetectorRef) { }

  HotelList:any=[];
  ModelTitle: string | undefined;
  ActivateAddEditHotelComp:boolean=false;
  hotel:any;

  ngOnInit() : void {
    this.refreshHotelList()
  }

  addClick(){
    this.hotel = {
      id:0,
      name:"",
      address:"",
    }
    this.ModelTitle = "Add Hotel";
    this.ActivateAddEditHotelComp = true;
  }
  editClick(item: any){
    this.hotel = item;
    this.ModelTitle = "Edit Hotel";
    this.ActivateAddEditHotelComp = true;
  }

  closeClick(){
    this.ActivateAddEditHotelComp = false;
    this.refreshHotelList();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.service.deleteHotel(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshHotelList();
        this.cdRef.detectChanges()
      });
    }
  }

  refreshHotelList(){
    this.service.getHotelList().subscribe(data=>{
       let hotels = JSON.stringify(data);
        let hotelList = JSON.parse(hotels);
          this.HotelList = hotelList.results;
    });
  }
}


