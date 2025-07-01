import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  homeMessage = signal('Hello world');

  keyUpHandler(event: Event){
    const input = event.target as HTMLInputElement;
    console.log(`user pressed the following key ${input.value}`);
  }

  name = signal('');

  onNameInput(event: Event){
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }
}
