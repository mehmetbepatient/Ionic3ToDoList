import { ReponseToDo } from "./json-placeholder";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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

  private randomSource = new BehaviorSubject<number>(0);
  random$: Observable<number> = this.randomSource.asObservable();

  private toDoList = new BehaviorSubject<any>(0);

  constructor(public http: HttpClient) {
    console.log("Hello JsonPlaceholderProvider Provider");

    this.toDoList.subscribe(
      n => console.log(n),
      e => console.log(e),
      () => console.log("completed")
    );

    this.getTodos();

    setInterval(() => {
      this.randomSource.next(Math.round(1000 * Math.random()));
    }, 1000);
  }

  getTodos(): void {
    this.http.get<ToDo[]>(`${this.API_URL}/todos`).subscribe(data => {
      data.sort(function(a, b) {
        return b.id - a.id;
      });

      this.toDoList.next(data);
    });
  }

  addTodo(data: ReponseToDo): void {
    this.http
      .post<ReponseToDo>(`${this.API_URL}/todos`, data)
      .subscribe(data => {
        console.log(data);
        this.toDoList.getValue().push({
          userId: null,
          id: this.toDoList.getValue().length + 1,
          title: data.title,
          completed: false
        });
        this.toDoList.next(
          this.toDoList.getValue().sort(function(a, b) {
            return b.id - a.id;
          })
        );
      });
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

  get todolist(): Subject<ToDo[]> {
    return this.toDoList;
  }
}
