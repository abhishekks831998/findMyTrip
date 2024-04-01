import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

      activityForm: any = {};

      constructor(private http: HttpClient) { }

      saveActivity() {
        // Assuming you have a Django backend running at http://localhost:8000/api/activities/
        this.http.post<any>('http://localhost:8000/api/activities/', this.activityForm)
          .subscribe(response => {
            console.log('Activity submitted successfully:', response);
            // Reset form after successful submission
            this.activityForm = {};
          }, error => {
            console.error('Error submitting activity:', error);
          });
      }

}
