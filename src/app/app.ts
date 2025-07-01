import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      main{
        padding: 16px;
      }
    `
  ],
})
export class App {
  protected title = 'first-ng-app';
}
