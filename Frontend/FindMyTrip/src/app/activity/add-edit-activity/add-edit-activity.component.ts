import {Component, OnInit,Input} from '@angular/core';
import {SharedService} from "../../shared.service";
import {ChangeDetectorRef} from "@angular/core";

@Component({
  selector: 'app-add-edit-activity',
  templateUrl: './add-edit-activity.component.html',
  styleUrl: './add-edit-activity.component.css'
})

export class AddEditActivityComponent implements OnInit {
  @Input() activity: any;
  id = 0;
  title: string | undefined;
  description: string | undefined;
  activity_price: number | undefined;
  showErrorModal: boolean = false; // For controlling error modal visibility
  message: string = "";

  constructor(private service: SharedService, private cdRef: ChangeDetectorRef) {
  }

  addActivity() {
    var val = {
      id: this.id,
      title: this.title,
      description: this.description,
      activity_price: this.activity_price
    };
    this.service.addActivity(val).subscribe(res => {
      this.showErrorModal = true;
      this.message = "Activity added successfully!";
    });
  }

  updateActivity() {
    var val = {
      id: this.id,
      title: this.title,
      description: this.description,
      activity_price: this.activity_price
    };
    this.service.updateActivity(val, this.id).subscribe(res => {
      this.showErrorModal = true;
      this.message = "Activity updated successfully!";
    });
  }

  closeModal() {
    this.showErrorModal = false;
  }

  ngOnInit(): void {
    this.id = this.activity.id;
    this.title = this.activity.title;
    this.description = this.activity.description;
    this.activity_price = this.activity.activity_price;

    if (this.showErrorModal) {
      setTimeout(() => {
        this.closeModal();
      }, 1000); // 1000 milliseconds = 1 second
    }
  }
}

