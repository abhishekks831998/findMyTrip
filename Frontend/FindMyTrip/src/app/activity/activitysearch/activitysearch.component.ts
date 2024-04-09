import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from "../../shared.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-activitysearch',
  templateUrl: './activitysearch.component.html',
  styleUrls: ['./activitysearch.component.css']
})
export class ActivitysearchComponent {

  @Output() changeactivityList = new EventEmitter<number>();
  query: string = '';
  searchResults: any[] = [];
  private searchQueryChanged = new Subject<string>();

  constructor(private activitySearchService: SharedService) {
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
      this.activitySearchService.getActivityList().subscribe(
        (data) => {
          let activities = JSON.stringify(data);
          let activityList = JSON.parse(activities);
          this.changeactivityList.emit(activityList.results);
        },
        (error) => {
          console.error(error);
        }
      );
    } // Ignore empty queries

    this.activitySearchService.searchactivities(this.query).subscribe(
      (data) => {
        this.searchResults = data;
        this.changeactivityList.emit(data.results);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
