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
  showErrorModal: boolean = false;
  message: string = '';


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
      flight_price: undefined,
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
        this.showErrorModal = true;
        this.message = "Flight deleted successfully!";
      });
    }
    this.refreshFlightList(null);
  }

  closeModal() {
    this.refreshFlightList(null);
    this.showErrorModal = false;
  }

  refreshFlightList(searchResult: any) {
    if(searchResult) {
      this.FlightList = searchResult;
    }
    else{
      this.service.getFlightList().subscribe({
        next: data => {
          let flights = JSON.stringify(data);
          let flightList = JSON.parse(flights);
          this.FlightList = flightList.results;
        },
        error: err => {
          this.message = 'Error fetching flight list';
          this.showErrorModal = true;
        }
      });
          if (this.query) {
            // Filter the FlightList based on the search query
            this.FlightList = this.FlightList.filter((flight: any) =>
              flight.flight_number.toLowerCase().includes(this.query.toLowerCase()) ||
              flight.airline.toLowerCase().includes(this.query.toLowerCase())
            );
          }
        }
    }
  }
