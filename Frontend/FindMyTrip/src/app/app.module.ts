import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { BookingModule } from './booking/booking.module';
import { PackageComponent } from './package/package.component';
import { ShowPackagesComponent } from './package/show-packages/show-packages.component';
import { AddEditPackagesComponent } from './package/add-edit-packages/add-edit-packages.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent } from './home/home.component';
import { AddEditHotelComponent } from './hotel/add-edit-hotel/add-edit-hotel.component';
import { ShowHotelComponent } from './hotel/show-hotel/show-hotel.component'
import {FlightComponent} from "./flight/flight.component";
import {AddEditFlightComponent} from "./flight/add-edit-flight/add-edit-flight.component";
import {ShowFlightComponent} from "./flight/show-flight/show-flight.component";
import { ActivityComponent } from './activity/activity.component';
import { ShowActivityComponent } from './activity/show-activity/show-activity.component';
import { AddEditActivityComponent } from './activity/add-edit-activity/add-edit-activity.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { FlightsearchComponent } from './flight/flightsearch/flightsearch.component';
import { HotelsearchComponent } from './hotel/hotelsearch/hotelsearch.component';
import {ActivitysearchComponent} from './activity/activitysearch/activitysearch.component';
import { PackageDetailsComponent } from './package/package-details/package-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MyprofileComponent } from './profile/myprofile/myprofile.component';
import { BookingHistoryComponent } from './profile/booking-history/booking-history.component';

@NgModule({
  declarations: [
    AppComponent,
    PackageComponent,
    ShowPackagesComponent,
    AddEditPackagesComponent,
    HotelComponent,
    HomeComponent,
    FlightComponent,
    AddEditFlightComponent,
    ShowFlightComponent,
    AddEditHotelComponent,
    ShowHotelComponent,
    ActivityComponent,
    ShowActivityComponent,
    AddEditActivityComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    FlightsearchComponent,
    HotelsearchComponent,
    ActivitysearchComponent,
    PackageDetailsComponent,
    ProfileComponent,
    MyprofileComponent,
    BookingHistoryComponent
  ],
  imports: [
    BookingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
