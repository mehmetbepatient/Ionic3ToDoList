import { Action } from "@ngrx/store";
import { ToDo, PatchRes } from "./todolist.service";

export enum ToDoListActionTypes {
  SET_TODO_LIST = "[ToDoList] SetToDoList",
  POST_TODO = "[ToDoList] PostToDo",
  PATCH_TODO = "[ToDoList] PatchToDo",
  DELETE_TODO = "[ToDoList] DeleteToDo",
  ADD_TODO = "[ToDoList] AddToDo"
}

export class SetToDoList implements Action {
  readonly type = ToDoListActionTypes.SET_TODO_LIST;

  constructor(public payload: Array<ToDo>) {}
}
export class PatchToDo implements Action {
  readonly type = ToDoListActionTypes.PATCH_TODO;

  constructor(public payload: PatchRes) {}
}
export class DeleteToDo implements Action {
  readonly type = ToDoListActionTypes.DELETE_TODO;

  constructor(public payload: ToDo) {}
}

export class AddToDo implements Action {
  readonly type = ToDoListActionTypes.ADD_TODO;

  constructor(public payload: ToDo) {}
}

export type ToDoListActions = SetToDoList | PatchToDo | DeleteToDo | AddToDo;
