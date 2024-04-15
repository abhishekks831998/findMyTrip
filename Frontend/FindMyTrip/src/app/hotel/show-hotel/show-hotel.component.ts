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
  showErrorModal: boolean = false;
  message: string = '';

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
      hotel_price: undefined,
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
        this.showErrorModal = true;
        this.message = "Hotel deleted successfully!";
      });
    }
     this.refreshHotelList(null);
  }

  closeModal(){
    this.refreshHotelList(null);
    this.showErrorModal = false;
  }

  refreshHotelList(searchResult: any){
    if(searchResult) {
      this.HotelList = searchResult;
    }
    else {
      this.service.getHotelList().subscribe({
        next:data=> {
          let hotels = JSON.stringify(data);
          let hotelList = JSON.parse(hotels);
          this.HotelList = hotelList.results;
        },
        error: (err) => {
          this.message = 'Error fetching hotel list';
          this.showErrorModal = true;
        }
      });
          if (this.query) {
            // Filter the FlightList based on the search query
            this.HotelList = this.HotelList.filter((hotel: any) =>
              hotel.name.toLowerCase().includes(this.query.toLowerCase()) ||
              hotel.address.toLowerCase().includes(this.query.toLowerCase())
            );
          }
    }
  }
}

