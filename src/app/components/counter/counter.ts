import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  counterValue = signal(0);

  increment(){
    this.counterValue.update(n => n+1);
    /* Alternate method to set value */
    //this.counterValue.set(this.counterValue()+1);
  }
  decrement(){
    this.counterValue.update(n => n-1);
  }
  reset(){
    this.counterValue.update(n => 0);
  }
}
