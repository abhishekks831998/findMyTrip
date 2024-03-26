import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent {
  @Input() people: any[] = [];
  @Output() addPerson = new EventEmitter();
  @Output() deletePerson = new EventEmitter<number>();

  constructor() { }

  addRow() {
    this.addPerson.emit();
  }

  deleteRow(index: number) {
    this.deletePerson.emit(index);
  }
}