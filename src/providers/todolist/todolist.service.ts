import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  AddToDo,
  SetToDoList,
  PatchToDo,
  DeleteToDo
} from "./todolist.actions";
import { AppState } from "./todolist.reducer";

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

  private toDoList: Array<ToDo> = [];

  constructor(public http: HttpClient, private store: Store<AppState>) {
    this.getTodos();
  }

  getTodos(): void {
    this.http.get<ToDo[]>(`${this.API_URL}/todos`).subscribe(data => {
      this.toDoList = data;
      this.store.dispatch(new SetToDoList(this.toDoList));
    });
  }

  addTodo(data: ToDo): Promise<ToDo> {
    return new Promise(resolve => {
      this.http.post<ToDo>(`${this.API_URL}/todos`, data).subscribe(data => {
        this.store.dispatch(
          new AddToDo({
            id: null,
            title: data.title,
            completed: false
          })
        );
      });
      resolve(data);
    });
  }

  patchTodo(todo: ToDo, values: PartialToDo): void {
    this.http
      .patch<ToDo>(`${this.API_URL}/todos/${todo.id}`, { ...todo, values })
      .subscribe(
        () => {
          this.store.dispatch(new PatchToDo({ todo, values }));
        },
        () => {
          this.store.dispatch(new PatchToDo({ todo, values }));
        }
      );
  }
  deleteTodo(data: ToDo): void {
    this.http.delete<ToDo>(`${this.API_URL}/todos/${data.id}`).subscribe(
      () => {
        this.store.dispatch(new DeleteToDo(data));
      },
      () => {
        this.store.dispatch(new DeleteToDo(data));
      }
    );
  }
}
