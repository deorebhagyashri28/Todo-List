import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo List App');
  
  private todoService = inject(TodoService);
  
  // Expose signals for template
 readonly todos = this.todoService.todos;
 readonly completedCount = this.todoService.completedCount;
 readonly pendingCount = this.todoService.pendingCount;
 readonly totalCount = this.todoService.totalCount;

 newTodoTitle = '';

 addTodo(): void {
   if (this.newTodoTitle.trim()) {
     this.todoService.addTodo(this.newTodoTitle);
     this.newTodoTitle = '';
   }
 }

 toggleTodo(id: number): void {
   this.todoService.toggleTodo(id);
 }

 deleteTodo(id: number): void {
   this.todoService.deleteTodo(id);
 }
}
