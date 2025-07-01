import { Component, input } from '@angular/core';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'app-todo-item',
  imports: [],
  template:`
      <tr class='todos__item'>
        <td> <input id="todo-{{todo().id}}" type='checkbox' [value]='todo().completed' /> </td>
        <td> <label for="todo-{{todo().id}}">{{todo().title}}</label>  </td>
        <td> {{todo().userId}} </td>
      </tr>
  `,
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  todo = input.required<Todo>();
}
