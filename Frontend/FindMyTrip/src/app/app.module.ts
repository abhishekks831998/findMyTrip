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


@NgModule({
  declarations: [
    AppComponent,
    PackageComponent,
    ShowPackagesComponent,
    AddEditPackagesComponent,
    HotelComponent,
    HomeComponent,
    AddEditHotelComponent,
    ShowHotelComponent
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
