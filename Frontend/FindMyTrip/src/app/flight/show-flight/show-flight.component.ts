import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../shared.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-flight',
  templateUrl: './show-flight.component.html',
  styleUrls: ['./show-flight.component.css']
})
export class ShowFlightComponent implements OnInit {
  ModalTitle: any;
  query: string = ''; // Define query property here
  isUserStaff: boolean = false;


  constructor(private service: SharedService, private cdRef: ChangeDetectorRef) { }

  FlightList: any = [];
  ModelTitle: string | undefined;
  ActivateAddEditFlightComponent: boolean = false;
  flight: any;

  ngOnInit(): void {
    this.refreshFlightList(null);
    this.checkUserStatus();
  }

  checkUserStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserStaff = localStorage.getItem('isStaff') === 'true';
    }
  }

  addClick() {
    this.flight = {
      id: 0,
      flight_number: "",
      airline: "",
    }
    this.ModelTitle = "Add Flight";
    this.ActivateAddEditFlightComponent = true;
  }
  editClick(item: any) {
    this.flight = item;
    this.ModelTitle = "Edit Flight";
    this.ActivateAddEditFlightComponent = true;
  }

  closeClick() {
    this.ActivateAddEditFlightComponent = false;
    this.refreshFlightList(null);
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteFlight(item.id).subscribe(data => {
        alert(data.toString());
        this.cdRef.detectChanges();
      });
    }
    this.refreshFlightList(null);
  }

  refreshFlightList(searchResult: any) {
    if(searchResult) {
      this.FlightList = searchResult;
    }
    else{
      this.service.getFlightList().subscribe(data => {
      let flights = JSON.stringify(data);
      let flightList = JSON.parse(flights);
      this.FlightList = flightList.results;

      if (this.query) {
        // Filter the FlightList based on the search query
        this.FlightList = this.FlightList.filter((flight: any) =>
          flight.flight_number.toLowerCase().includes(this.query.toLowerCase()) ||
          flight.airline.toLowerCase().includes(this.query.toLowerCase())
        );
      }
    });
    }

  }
}
