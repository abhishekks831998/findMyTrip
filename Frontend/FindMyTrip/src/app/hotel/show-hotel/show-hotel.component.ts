import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-hotel',
  templateUrl: './show-hotel.component.html',
  styleUrl: './show-hotel.component.css'
})
export class ShowHotelComponent implements OnInit{
  ModalTitle: any;
  query: string = ''; // Define query property here
  isUserStaff: boolean = false;

  constructor(private service:SharedService, private cdRef: ChangeDetectorRef) { }

  HotelList:any=[];
  ModelTitle: string | undefined;
  ActivateAddEditHotelComponent:boolean=false;
  hotel: any;

  ngOnInit() : void {
    this.refreshHotelList(null);
    this.checkUserStatus();

  }

  checkUserStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserStaff = localStorage.getItem('isStaff') === 'true';
    }
  }

  addClick(){
    this.hotel = {
      id: 0,
      name: "",
      address: "",
    }
    this.ModelTitle = "Add Hotel";
    this.ActivateAddEditHotelComponent = true;
  }

  editClick(item: any){
    this.hotel = item;
    this.ModelTitle = "Edit Hotel";
    this.ActivateAddEditHotelComponent = true;
  }

  closeClick(){
    this.ActivateAddEditHotelComponent = false;
    this.refreshHotelList(null);
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.service.deleteHotel(item.id).subscribe(data=>{
        alert(data.toString());
        this.cdRef.detectChanges()
      });
    }
     this.refreshHotelList(null);
  }

  refreshHotelList(searchResult: any){
    if(searchResult) {
      this.HotelList = searchResult;
    }
    else {
      this.service.getHotelList().subscribe(data=>{
      let hotels = JSON.stringify(data);
      let hotelList = JSON.parse(hotels);
      this.HotelList = hotelList.results;

      if (this.query) {
        // Filter the FlightList based on the search query
        this.HotelList = this.HotelList.filter((hotel: any) =>
          hotel.name.toLowerCase().includes(this.query.toLowerCase()) ||
          hotel.address.toLowerCase().includes(this.query.toLowerCase())
          );
      }
    });
    }

  }
}

