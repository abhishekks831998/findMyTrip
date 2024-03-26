import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from './../commons/add-person-dialog/add-person-dialog.component';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  @Input() userId: string = '';
  @Input() packageId: string = '';
  @Input() bookingId: string = '';
  people: any[] = [];
  formData: any = {};
  constructor(private http: HttpClient, private dialog: MatDialog, private bookingService: BookingService) { 
  }
  ngOnInit() {
    this.formData = { userId: this.userId, packageId: this.packageId, guest_info: {} };
    if (this.bookingId) {
      // Fetch booking details if booking ID is provided
      this.bookingService.getBookingDetails(this.bookingId).subscribe(
        (response: any) => {
          //debugger;
          // Set form data with fetched details
          //this.formData = { ...this.bookingDetails };
        },
        error => {
          console.error('Error fetching booking details:', error);
        }
      );
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //debugger
        this.addPerson(result);
      }
    });
  }

addPerson(person:any) {
  this.people = [...this.people, person];
}


deletePerson(index: number) {
  this.people = this.people.filter((_, i) => i !== index);
}

submitForm() {
  let data = JSON.parse( JSON.stringify(this.formData))
  data['guest_info'] = this.people;
    this.bookingService.submitBooking(data)
      .subscribe(
        response => {
          alert('Booking submitted successfully:');
          // Reset form after successful submission
          this.formData = {};
        },
        error => {
          console.error('Error submitting booking:', error);
        }
      );
  }
}
