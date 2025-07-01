import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient);

  todoItems: Array<Todo> = [{
      title: 'Groceries',
      id:0,
      userId:1,
      completed: false
    },
    {
      title:'Car wash',
      id: 1,
      userId:1,
      completed:false
    }
  ];

  getTodosFromApi(){
    const url = `https://jsonplaceholder.typicode.com/todos`;
    return this.http.get<Todo[]>(url);
  }

  constructor() { }
}
