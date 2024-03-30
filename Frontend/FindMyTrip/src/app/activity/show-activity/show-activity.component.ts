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

  constructor(private service:SharedService, private cdRef: ChangeDetectorRef) { }

  ActivityList:any=[];
  ModelTitle: string | undefined;
  ActivateAddEditActivityComponent:boolean=false;
  activity:any;

  ngOnInit() : void {
    this.refreshActivityList()
  }

  addClick(){
    this.activity = {
      id:0,
      title:"",
      description:"",
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
    this.refreshActivityList();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.service.deleteActivity(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshActivityList();
        this.cdRef.detectChanges()
      });
    }
  }

  refreshActivityList(){
    this.service.getActivityList().subscribe(data=>{
       let activities = JSON.stringify(data);
        let activityList = JSON.parse(activities);
          this.ActivityList = activityList.results;
    });
  }
}


