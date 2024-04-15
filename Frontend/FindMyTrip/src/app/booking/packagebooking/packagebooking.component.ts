import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../../commons/add-person-dialog/add-person-dialog.component';
import { BookingService } from '../booking.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../account/account.service';
import { stripeConfig } from '../../stripe.config';
import { StripeScriptTag } from "stripe-angular"

@Component({
  selector: 'app-packagebooking',
  templateUrl: './packagebooking.component.html',
  styleUrl: './packagebooking.component.css'
})
export class PackagebookingComponent {
  @Input() userId: string = '';
  @Input() packageId: string = '';
  @Input() bookingId: string = '';
  showBookingForm: boolean = true;
  showPaymentForm: boolean = false;
  cardCaptureReady = false
  isStaff: any = localStorage.getItem('isStaff');
  card: any = {};
  stripe = stripeConfig.publicKey;
  packageDetails: any = {};
  people: any[] = [];
  formData: any = {};
  userList: any = {};
  constructor(private stripeScriptTag: StripeScriptTag, private accountService: AccountService, private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private dialog: MatDialog, private bookingService: BookingService) { 
    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey('');
    }

  }
  ngOnInit() {
    this.isStaff = localStorage.getItem('isStaff') !=="false"? true:false;
    this.accountService.getUserList(this.isStaff).subscribe((responseUserList: any) => {
      
      this.userList = responseUserList.results;

      this.activatedRoute.queryParams.subscribe((params) => {
        this.packageDetails = JSON.parse(params['packageInfo']);
        var user_id : any  = parseInt(localStorage.getItem('userId') as string);
        this.formData = { user: user_id, package: this.packageDetails.id, guest_info: {} };
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
      });
    } );
    
    
    
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
  let data = JSON.parse( JSON.stringify(this.formData));
  data['paymentamount'] = this.packageDetails.total_price *  this.people.length
  data['guest_info'] = this.people;
    this.bookingService.submitBooking(data)
      .subscribe(
        response => {
          this.snackBar.open('Booking submitted successfully', 'Close', {
            duration: 3000, // Duration in milliseconds (3 seconds in this case)
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          // Reset form after successful submission
          this.formData = {};
          this.router.navigate(['/bookings']);
        },
        error => {
          console.error('Error submitting booking:', error);
        }
      );
  }

  onToken(token: any) {
    console.log(token);
    // Send token to your backend for payment processing
}

onError(error: any) {
    console.error(error);
}
togglePaymentForm() {
  this.showBookingForm = false;
  this.showPaymentForm = !this.showPaymentForm;
}
}
