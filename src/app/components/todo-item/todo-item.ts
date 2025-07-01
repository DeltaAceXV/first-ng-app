import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: '[app-todo-item]',
  imports: [UpperCasePipe],
  template:`
      <td> <input id="todo-{{todo().id}}" type='checkbox' [checked]='todo().completed' (change)="this.todoClicked()" /> </td>
      <td> <label for="todo-{{todo().id}}">{{todo().title | uppercase}}</label>  </td>
      <td> {{todo().userId}} </td>
  `,
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();

  todoClicked(){
    this.todoToggled.emit(this.todo());
  }
}
