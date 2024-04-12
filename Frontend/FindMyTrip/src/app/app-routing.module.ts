import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { PackageComponent} from "./package/package.component";
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent} from './home/home.component';
import { FlightComponent} from './flight/flight.component';
import { ActivityComponent} from './activity/activity.component';
import { AccountComponent} from "./account/account.component";
import {LoginComponent} from "./account/login/login.component";
import {RegisterComponent} from "./account/register/register.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'packages', component: PackageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hotels', component: HotelComponent },
  { path: 'flights', component: FlightComponent },
  { path: 'activities', component: ActivityComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent}
  // add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
