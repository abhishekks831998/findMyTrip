import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.css']
})
export class AddPersonDialogComponent {
  firstName: string = '';
  lastName: string = '';
  dob: string = '';

 constructor(public dialogRef: MatDialogRef<AddPersonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.dob = data.dob;
    } else {
      this.firstName = '';
      this.lastName = '';
      this.dob = '';
    }
  }

  onAdd() {
    const newPerson = { firstName: this.firstName, lastName: this.lastName, dob: this.dob };
    this.dialogRef.close(newPerson);
  }
}