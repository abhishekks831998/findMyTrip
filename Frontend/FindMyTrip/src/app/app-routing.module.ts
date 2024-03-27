import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { PackageComponent} from "./package/package.component";

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'packages', component: PackageComponent }
  // add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
