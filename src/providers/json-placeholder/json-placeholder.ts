import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { map } from "rxjs/operators";

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

export interface PartialToDo {
  title?: string;
  completed?: boolean;
}

@Injectable()
export class JsonPlaceholderProvider {
  private API_URL: string = "https://jsonplaceholder.typicode.com";

  private toDoList: Array<ToDo> = [];
  private toDoListSource = new Subject<ToDo[]>();
  toDoList$: Observable<ToDo[]> = this.toDoListSource
    .asObservable()
    .pipe(map(toDo => toDo.sort((a, b) => b.id - a.id)));

  toDoListCompleted$: Observable<ToDo[]> = this.toDoList$.pipe(
    map(toDo => toDo.filter(toDo => toDo.completed))
  );
  toDoListNotCompleted$: Observable<ToDo[]> = this.toDoList$.pipe(
    map(toDo => toDo.filter(toDo => !toDo.completed))
  );

  constructor(public http: HttpClient) {
    this.getTodos();
  }

  getTodos(): void {
    this.http.get<ToDo[]>(`${this.API_URL}/todos`).subscribe(data => {
      this.toDoList = data;
      this.toDoListSource.next(this.toDoList);
    });
  }

  addTodo(data: ToDo): void {
    this.http.post<ToDo>(`${this.API_URL}/todos`, data).subscribe(data => {
      this.toDoList.push({
        id: this.maxToDoUID(this.toDoList),
        title: data.title,
        completed: false
      });
      this.toDoListSource.next(this.toDoList);
    });
  }

  patchTodo(todo: ToDo, values: PartialToDo): void {
    this.http.patch<ToDo>(`${this.API_URL}/todos/${todo.id}`, values).subscribe(
      result => {
        this.toDoList.splice(this.toDoList.indexOf(todo), 1, {
          id: this.maxToDoUID(this.toDoList),
          title: result.title,
          completed: result.completed
        });
        this.toDoListSource.next(this.toDoList);
      },
      () => {
        this.toDoList.splice(this.toDoList.indexOf(todo), 1, {
          id: this.maxToDoUID(this.toDoList),
          title: values.title,
          completed: values.completed
        });
        this.toDoListSource.next(this.toDoList);
      }
    );
  }
  deleteTodo(data): void {
    this.http.delete<ToDo>(`${this.API_URL}/todos/${data.id}`).subscribe(
      () => {
        this.toDoList.splice(this.toDoList.indexOf(data), 1);
        this.toDoListSource.next(this.toDoList);
      },
      () => {
        this.toDoList.splice(this.toDoList.indexOf(data), 1);
        this.toDoListSource.next(this.toDoList);
      }
    );
  }

  private maxToDoUID(toDoList: Array<ToDo>): number {
    return Math.max(...toDoList.map(toDo => toDo.id)) + 1;
  }
}
