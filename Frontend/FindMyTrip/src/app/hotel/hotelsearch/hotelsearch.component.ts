import {Component, EventEmitter, Output} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-hotelsearch',
  templateUrl: './hotelsearch.component.html',
  styleUrl: './hotelsearch.component.css'
})
export class HotelsearchComponent {

@Output() changehotelList = new EventEmitter<number>();
  query: string = '';
  searchResults: any[] = [];
  constructor(private hotelSearchService: SharedService) {}

  search(): void {
    if (!this.query.trim()) {
      this.hotelSearchService.getHotelList().subscribe(
      (data) => {
        let hotels = JSON.stringify(data);
        let hotelList = JSON.parse(hotels);
        this.changehotelList.emit(hotelList.results);
      },
      (error) => {
        console.error(error);
      }
    );
    } // Ignore empty queries

    this.hotelSearchService.searchHotels(this.query).subscribe(
      (data) => {
        this.searchResults = data;
        this.changehotelList.emit(data.results);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

