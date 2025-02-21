import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule],
  template: `
    <h1 class="text-3xl font-bold underline p-4">  Hello, {{ title }}</h1>
    <mat-slide-toggle>Toggle me!</mat-slide-toggle>
    <router-outlet></router-outlet>
  `,
  styles: ''
})
export class AppComponent {
  title = 'budget-app';
}
