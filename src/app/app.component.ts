import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `
  <input [(ngModel)]="name" type="text">
  {{name}}
  `,
  styles: []
})
export class AppComponent {
  public name : string = '';

  logMessage(value: string){
    console.log(value);
  }
}
