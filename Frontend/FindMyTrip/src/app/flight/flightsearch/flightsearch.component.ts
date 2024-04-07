import {Component, EventEmitter, Output} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrl: './flightsearch.component.css'
})
export class FlightsearchComponent {

@Output() changeflightList = new EventEmitter<number>();
  query: string = '';
  searchResults: any[] = [];
  constructor(private flightSearchService: SharedService) {}

  search(): void {
    if (!this.query.trim()) {
      this.flightSearchService.getFlightList().subscribe(
      (data) => {
        let flights = JSON.stringify(data);
        let flightList = JSON.parse(flights);
        this.changeflightList.emit(flightList.results);
      },
      (error) => {
        console.error(error);
      }
    );
    } // Ignore empty queries

    this.flightSearchService.searchFlights(this.query).subscribe(
      (data) => {
        this.searchResults = data;
        this.changeflightList.emit(data.results);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
