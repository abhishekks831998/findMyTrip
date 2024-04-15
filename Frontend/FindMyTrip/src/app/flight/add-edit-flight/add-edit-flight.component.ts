import {Component, OnInit,Input} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-edit-flight',
  templateUrl: './add-edit-flight.component.html',
  styleUrl: './add-edit-flight.component.css'
})

export class AddEditFlightComponent implements OnInit {
  @Input() flight: any;
  id: number | undefined;
  flight_number: string | undefined;
  airline: string | undefined;
  flight_price: | undefined;
  showErrorModal: boolean = false; // For controlling error modal visibility
  message: string = "";

  constructor(private service: SharedService) { }

  addFlight(){
    var val = {id:this.id,
              flight_number:this.flight_number,
              airline:this.airline,
              flight_price:this.flight_price};
    this.service.addFlight(val).subscribe(res=>{
      this.showErrorModal = true;
      this.message = "Flight added successfully!";
    });

  }
  updateFlight(){
    var val = {id:this.id,
              flight_number:this.flight_number,
              airline:this.airline,
              flight_price:this.flight_price};
    this.service.updateFlight(val,this.id).subscribe(res=>{
      this.showErrorModal = true;
      this.message = "Flight updated successfully!";
    });

  }

  closeModal(){
    this.showErrorModal = false;
  }

  ngOnInit(): void {
    this.id = this.flight.id;
    this.flight_number = this.flight.flight_number;
    this.airline = this.flight.airline;
    this.flight_price = this.flight.flight_price;
  }

}
