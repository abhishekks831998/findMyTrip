import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestsComponent } from './guests/guests.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AddPersonDialogComponent } from './add-person-dialog/add-person-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  declarations: [
    GuestsComponent,
    AddPersonDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatDatepickerModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    
    MatFormFieldModule 
  ],
  exports : [
    GuestsComponent
  ]
})
export class CommonsModule { }
