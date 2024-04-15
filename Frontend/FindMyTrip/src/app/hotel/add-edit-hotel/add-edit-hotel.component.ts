import {Component, OnInit,Input} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-edit-hotel',
  templateUrl: './add-edit-hotel.component.html',
  styleUrl: './add-edit-hotel.component.css'
})

export class AddEditHotelComponent implements OnInit {
  @Input() hotel: any;
  id: number | undefined;
  name: string | undefined;
  address: string | undefined;
  hotel_price: number | undefined;
  message: string = "";
  showErrorModal: boolean = false; // For controlling error modal visibility

  constructor(private service: SharedService) { }

  addHotel(){
    var val = {id:this.id,
              name:this.name,
              address:this.address,
              hotel_price:this.hotel_price};
    this.service.addHotel(val).subscribe(res=>{
      this.showErrorModal = true;
      this.message = "Hotel added successfully!";
    });

  }
  updateHotel(){
    var val = {id:this.id,
              name:this.name,
              address:this.address,
              hotel_price:this.hotel_price};
    this.service.updateHotel(val,this.id).subscribe(res=>{
      this.showErrorModal = true;
      this.message = "Hotel updated successfully!";
    });

  }

  closeModal(){
    this.showErrorModal = false;
  }

  ngOnInit(): void {
    this.id = this.hotel.id;
    this.name = this.hotel.name;
    this.address = this.hotel.address;
    this.hotel_price = this.hotel.hotel_price;
  }

}
