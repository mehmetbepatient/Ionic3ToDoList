import { ReponseToDo } from "./json-placeholder";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the JsonPlaceholderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface ReponseToDo {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable()
export class JsonPlaceholderProvider {
  private API_URL: string = "https://jsonplaceholder.typicode.com";
  private responseProvider: ToDo;

  constructor(public http: HttpClient) {
    console.log("Hello JsonPlaceholderProvider Provider");
  }

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.API_URL}/todos`);
  }

  addTodo(data): Observable<ReponseToDo> {
    return this.http.post<ReponseToDo>(`${this.API_URL}/todos`, data);
  }
  patchTodo(data): Observable<ReponseToDo> {
    return this.http.patch<ReponseToDo>(
      `${this.API_URL}/todos/${data.id}`,
      data
    );
  }
  deleteTodo(data): Observable<ReponseToDo> {
    return this.http.delete<ReponseToDo>(`${this.API_URL}/todos/${data.id}`);
  }
  get response(): ToDo {
    return this.responseProvider;
  }
  set response(response: ToDo) {
    this.responseProvider = response;
  }
}
