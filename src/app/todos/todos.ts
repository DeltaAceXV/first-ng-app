import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from "../components/todo-item/todo-item";
import { HighlightCompletedTodo } from '../directives/highlight-completed-todo';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [TodoItem, HighlightCompletedTodo, FormsModule, FilterTodosPipe],
  //templateUrl: './todos.html',
  template:`
    <h3>List of Todos</h3>
    
    @if(!showTable()){
      <p>Loading...</p>
    }
    @if(showTable()){
      <form>
      <label>Filter Todos</label>
      <input name="searchTerm" [(ngModel)]="searchTerm" placeholder="Search list..." />
      </form>

      <table>
          <thead>
            <tr>
              <th>Completed</th>
              <th>Title</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
              @for(todo of this.todoItems() | filterTodos : searchTerm(); track todo.id){
                <tr appHighlightCompletedTodo [isCompleted]="todo.completed" (todoToggled)="updateTodoItem($event)" app-todo-item [todo]="todo" class='todos__item'>
              </tr>
                  <!-- <tr class='todos__item'>
                    <td> <input id="todo-{{todo.id}}" type='checkbox' [value]='todo.completed' /> </td>
                    <td> <label for="todo-{{todo.id}}">{{todo.title}}</label>  </td>
                    <td> {{todo.userId}} </td>
                  </tr> -->
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
  searchTerm = signal('');
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

  updateTodoItem(todoItem: Todo){
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if(todo.id == todoItem.id){
          return {
            ... todo,
            completed: !todo.completed,
          };
        }
        return todo; 
      })
    })
  }
}
