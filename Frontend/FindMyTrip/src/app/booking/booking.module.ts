import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { GuestsComponent } from './../commons/guests/guests.component';
import { CommonsModule } from './../commons/commons.module';

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports:[BookingComponent]

})
export class BookingModule { }
