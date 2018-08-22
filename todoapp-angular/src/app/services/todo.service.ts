import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToDo } from "../models/todo.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable()
export class TodoService {
  api_url = 'http://localhost:3000';
  todoUrl = `${this.api_url}/api/todos`;

  constructor(private http: HttpClient) {}

  createTodo(todo: ToDo): Observable<any> {
    return this.http.post(`${this.todoUrl}`, todo);
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get(this.todoUrl)
      .pipe(
        map(res => {
          return res["data"] as ToDo[];
        })
      )
  }

  editTodo(todo: ToDo) {
    let editUrl = `${this.todoUrl}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): any {
    let deleteUrl = `${this.todoUrl}/${id}`;
    return this.http.delete(deleteUrl)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}