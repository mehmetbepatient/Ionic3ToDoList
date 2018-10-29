import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

/*
  Generated class for the JsonPlaceholderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable()
export class JsonPlaceholderProvider {
  private API_URL: string = "https://jsonplaceholder.typicode.com";

  private toDoSource = new Subject<ToDo[]>();
  toDoList$: Observable<ToDo[]> = this.toDoSource.asObservable();
  private toDoList: Array<ToDo> = [];

  constructor(public http: HttpClient) {
    console.log("Hello JsonPlaceholderProvider Provider");

    this.getTodos();
  }

  getTodos(): void {
    this.http.get<ToDo[]>(`${this.API_URL}/todos`).subscribe(data => {
      this.toDoList = data.sort((a, b) => b.id - a.id);
      this.toDoSource.next(this.toDoList);
    });
  }

  addTodo(data: ToDo): void {
    this.http.post<ToDo>(`${this.API_URL}/todos`, data).subscribe(data => {
      console.log(data);
      this.toDoList.unshift({
        id: this.toDoList.length + 1,
        title: data.title,
        completed: false
      });
      this.toDoSource.next(this.toDoList);
    });
  }
  patchTodo(data: Array<ToDo>): void {
    this.http
      .patch<ToDo>(`${this.API_URL}/todos/${data[0].id}`, data[0])
      .subscribe(
        result => {
          console.log(this.toDoList.indexOf(result));
          console.log(result);

          this.toDoList.splice(this.toDoList.indexOf(data[1]), 1, {
            id: this.toDoList.length + 1,
            title: result.title,
            completed: result.completed
          });
          this.toDoSource.next(this.toDoList);
        },
        err => {
          this.toDoList.splice(this.toDoList.indexOf(data[1]), 1, {
            id: this.toDoList.length + 1,
            title: data[0].title,
            completed: data[0].completed
          });
          this.toDoSource.next(this.toDoList);
        }
      );
  }
  deleteTodo(data): void {
    this.http.delete<ToDo>(`${this.API_URL}/todos/${data.id}`).subscribe(
      result => {
        console.log(this.toDoList.indexOf(data));
        this.toDoList.splice(this.toDoList.indexOf(data), 1);
        this.toDoSource.next(this.toDoList);
      },
      err => {
        this.toDoList.splice(this.toDoList.indexOf(data), 1);
        this.toDoSource.next(this.toDoList);
      }
    );
  }
}
