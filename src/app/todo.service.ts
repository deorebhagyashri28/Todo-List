import { Injectable, signal, computed } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Signal to hold the list of todos
  private todosSignal = signal<Todo[]>([]);

  // Computed signal for completed todos count
  readonly completedCount = computed(() => 
    this.todosSignal().filter(todo => todo.completed).length
  );

  // Computed signal for pending todos count
  readonly pendingCount = computed(() => 
    this.todosSignal().filter(todo => !todo.completed).length
  );

  // Computed signal for total todos count
  readonly totalCount = computed(() => this.todosSignal().length);

  // Read-only signal for todos
  readonly todos = this.todosSignal.asReadonly();

  private nextId = 1;

  addTodo(title: string): void {
    if (title.trim()) {
      const newTodo: Todo = {
        id: this.nextId++,
        title: title.trim(),
        completed: false
      };
      this.todosSignal.update(todos => [...todos, newTodo]);
    }
  }

  toggleTodo(id: number): void {
    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number): void {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
  }
}
