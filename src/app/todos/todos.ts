import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [],
  //templateUrl: './todos.html',
  template:`
    <h3>List of Todos</h3>
    
    @if(!showTable()){
      <p>Loading...</p>
    }
    @if(showTable()){
      <table>
          <thead>
            <tr>
              <th>Completed</th>
              <th>Title</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
              @for(todo of this.todoItems(); track todo.id){
                  <tr class='todos__item'>
                    <td> <input id="todo-{{todo.id}}" type='checkbox' [value]='todo.completed' /> </td>
                    <td> <label for="todo-{{todo.id}}">{{todo.title}}</label>  </td>
                    <td> {{todo.userId}} </td>
                  </tr>
              }
          </tbody>
        </table>
    }

      
  `,
  styleUrl: './todos.scss'
})
export class todos implements OnInit{
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  showTable = signal(false);

  ngOnInit() : void{
    console.log(this.todoService.todoItems);
    //this.todoItems.set(this.todoService.todoItems);

    this.todoService.getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos)=>{
        this.todoItems.set(todos);
        this.showTable.set(true);
      })
    ;
  }
}
