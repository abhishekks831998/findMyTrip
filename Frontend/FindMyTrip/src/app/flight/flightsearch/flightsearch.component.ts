import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from "../../shared.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css']
})
export class FlightsearchComponent {

  @Output() changeflightList = new EventEmitter<number>();
  query: string = '';
  searchResults: any[] = [];
  private searchQueryChanged = new Subject<string>();

  constructor(private flightSearchService: SharedService) {
    this.searchQueryChanged.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.search();
    });
  }

  onQueryChange(): void {
        this.searchQueryChanged.next(this.query); // Emit event to trigger search
  }

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
