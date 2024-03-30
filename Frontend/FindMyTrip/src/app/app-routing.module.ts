import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { PackageComponent} from "./package/package.component";
import { HotelComponent } from './hotel/hotel.component';
import { HomeComponent} from './home/home.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'packages', component: PackageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'hotels', component: HotelComponent }
  // add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
