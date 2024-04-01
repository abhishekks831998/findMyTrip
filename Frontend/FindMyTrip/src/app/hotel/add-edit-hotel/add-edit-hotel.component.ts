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

  constructor(private service: SharedService) { }

  addHotel(){
    var val = {id:this.id,
              name:this.name,
              address:this.address};
    this.service.addHotel(val).subscribe(res=>{
      alert(res.toString());
    });

  }
  updateHotel(){
    var val = {id:this.id,
              name:this.name,
              address:this.address};
    this.service.updateHotel(val,this.id).subscribe(res=>{
      alert(res.toString());
    });

  }

  ngOnInit(): void {
    this.id = this.hotel.id;
    this.name = this.hotel.name;
    this.address = this.hotel.address;
  }

}
