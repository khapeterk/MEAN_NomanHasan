import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { ToDo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newTodo: ToDo = new ToDo();
  todosList: ToDo[];
  editTodos: ToDo[] = [];

  constructor( private todoService: TodoService ) {}

  ngOnInit(): void {
    this.todoService.getToDos().subscribe(todos => {
      this.todosList = todos;
      console.log(todos);
    })
  }

  create(): void {
    this.todoService.createTodo(this.newTodo).subscribe(res => {
      this.todosList.push(res.data);
      this.newTodo = new ToDo();
    })
  }

  editTodo(todo: ToDo): void {
    console.log(todo);
    if (this.todosList.includes(todo)) {
      if(!this.editTodos.includes(todo)) {
        this.editTodos.push(todo);
      } else {
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo).subscribe(
          res => {
            console.log("Update Successful");
          },
          err => {
            this.editTodo(todo);
            console.error("Update Unsuccessful");
          }
        )
      }
    }
  }

  doneTodo(todo: ToDo): void {
    todo.status = "Done";
    this.todoService.editTodo(todo).subscribe(
      res => {
        console.log("Update Successful");
      },
      err => {
        this.editTodo(todo);
        console.error("Update Unsuccessful");
      }
    )
  }

  submitTodo(event, todo: ToDo) {
    if(event.keyCode == 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: ToDo): void {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })   
  }
}
