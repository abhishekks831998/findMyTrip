import {Component, OnInit,Input} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-add-edit-activity',
  templateUrl: './add-edit-activity.component.html',
  styleUrl: './add-edit-activity.component.css'
})

export class AddEditActivityComponent implements OnInit {
  @Input() activity: any;
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;

  constructor(private service: SharedService) { }

  addActivity(){
    var val = {id:this.id,
              title:this.title,
              description:this.description};
    this.service.addActivity(val).subscribe(res=>{
      alert(res.toString());
    });

  }
  updateActivity(){
    var val = {id:this.id,
               title:this.title,
               description:this.description};
    this.service.updateActivity(val,this.id).subscribe(res=>{
      alert(res.toString());
    });

  }

  ngOnInit(): void {
    this.id = this.activity.id;
    this.title = this.activity.title;
    this.description = this.activity.description;
  }

}
