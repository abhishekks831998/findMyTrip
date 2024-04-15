import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-activity',
  templateUrl: './show-activity.component.html',
  styleUrl: './show-activity.component.css'
})
export class ShowActivityComponent implements OnInit{
ModalTitle: any;
query: string = '';
isUserStaff: boolean = false;
showErrorModal: boolean = false;
message: string = '';

  constructor(private service:SharedService, private cdRef: ChangeDetectorRef) { }

  ActivityList:any=[];
  ModelTitle: string | undefined;
  ActivateAddEditActivityComponent:boolean=false;
  activity:any;

  ngOnInit() : void {
    this.refreshActivityList(null);
    this.checkUserStatus();
  }

  checkUserStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserStaff = localStorage.getItem('isStaff') === 'true';
    }
  }

  addClick(){
    this.activity = {
      id:0,
      title:"",
      description:"",
      activity_price: undefined,
    }
    this.ModelTitle = "Add Activity";
    this.ActivateAddEditActivityComponent = true;
  }
  editClick(item: any){
    this.activity = item;
    this.ModelTitle = "Edit Activity";
    this.ActivateAddEditActivityComponent = true;
  }

  closeClick(){
    this.ActivateAddEditActivityComponent = false;
    this.refreshActivityList(null);
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.service.deleteActivity(item.id).subscribe(data=>{
        this.showErrorModal = true;
        this.message = 'Activity deleted successfully!';
      });
    }
    this.refreshActivityList(null);
  }

  closeModal(){
    this.refreshActivityList(null);
    this.showErrorModal = false;
  }

  refreshActivityList(searchResult: any){
    if(searchResult) {
      this.ActivityList = searchResult;
    }

    else{
    this.service.getActivityList().subscribe({
      next: (data) => {
        let activities = JSON.stringify(data);
        let activityList = JSON.parse(activities);
        this.ActivityList = activityList.results;
      },
      error: (err) => {
        this.message = 'Error loading activity list';
        this.showErrorModal = true;
      }
    });
      if (this.query) {
        // Filter the FlightList based on the search query
        this.ActivityList = this.ActivityList.filter((activity: any) =>
          activity.title.toLowerCase().includes(this.query.toLowerCase()) ||
          activity.description.toLowerCase().includes(this.query.toLowerCase())
        );
      }
    }
  }
}
