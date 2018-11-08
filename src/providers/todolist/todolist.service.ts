import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

export interface PartialToDo {
  title?: string;
  completed: boolean;
}
export interface PatchRes {
  todo: ToDo;
  values: PartialToDo;
}

@Injectable()
export class ToDoListService {
  private API_URL: string = "https://jsonplaceholder.typicode.com";

  constructor(public http: HttpClient) {}

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.API_URL}/todos`);
  }

  addTodo(data: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(`${this.API_URL}/todos`, data);
  }

  patchTodo(todo: ToDo, values: PartialToDo): Observable<ToDo> {
    return this.http.patch<ToDo>(`${this.API_URL}/todos/${todo.id}`, {
      ...todo,
      values
    });
  }
  deleteTodo(data: ToDo): Observable<ToDo> {
    return this.http.delete<ToDo>(`${this.API_URL}/todos/${data.id}`);
  }
}
