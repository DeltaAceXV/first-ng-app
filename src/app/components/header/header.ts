import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodosService } from '../../services/todos';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [TodosService]
})
export class Header {
  /*
  Signal is like a declaration of a function
  whereas just pure initialization is variable declaration

  Signals are recommended moving forward for data binding.
  Angular 16 or below did not have signals initially
  */
  title = ('My First Angular app');
}
