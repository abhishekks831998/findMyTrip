import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from "../../shared.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-hotelsearch',
  templateUrl: './hotelsearch.component.html',
  styleUrls: ['./hotelsearch.component.css']
})
export class HotelsearchComponent {

  @Output() changehotelList = new EventEmitter<number>();
  query: string = '';
  searchResults: any[] = [];
  private searchQueryChanged = new Subject<string>();

  constructor(private hotelSearchService: SharedService) {
    this.searchQueryChanged.pipe(
      debounceTime(300) // Adjust debounce time as needed (300ms in this case)
    ).subscribe(query => {
      this.search();
    });
  }

  onQueryChange(): void {
    this.searchQueryChanged.next(this.query);
  }

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
