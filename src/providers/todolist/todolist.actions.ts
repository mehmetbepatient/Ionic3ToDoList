import { Action } from "@ngrx/store";
import { ToDo, PatchRes } from "./todolist.service";

export enum ToDoListActionTypes {
  SET_TODO_LIST = "[ToDoList] SetToDoList",
  GET_TODO_LIST_SUCCESS = "[ToDoList] GetToDoListSuccess",
  GET_TODO_LIST_FAILED = "[ToDoList] GetToDoListFailed",
  PATCH_TODO = "[ToDoList] PatchToDo",
  PATCH_TODO_SUCCESS = "[ToDoList] PatchToDoSuccess",
  PATCH_TODO_FAILED_ID = "[ToDoList] PatchToDoFailedId",
  DELETE_TODO = "[ToDoList] DeleteToDo",
  DELETE_TODO_SUCCESS = "[ToDoList] DeleteToDoSuccess",
  DELETE_TODO_FAILED_ID = "[ToDoList] DeleteToDoFailedId",
  ADD_TODO = "[ToDoList] AddToDo",
  ADD_TODO_SUCCESS = "[ToDoList] AddToDoSuccess",
  ADD_TODO_FAILED = "[ToDoList] AddToDoFailed"
}

export class SetToDoList implements Action {
  readonly type = ToDoListActionTypes.SET_TODO_LIST;

  constructor(public payload?: any) {}
}

export class GetToDoListSuccess implements Action {
  readonly type = ToDoListActionTypes.GET_TODO_LIST_SUCCESS;

  constructor(public payload: Array<ToDo>) {}
}

export class GetToDoListFailed implements Action {
  readonly type = ToDoListActionTypes.GET_TODO_LIST_FAILED;

  constructor(public payload?: any) {}
}

export class PatchToDo implements Action {
  readonly type = ToDoListActionTypes.PATCH_TODO;

  constructor(public payload: PatchRes) {}
}
export class PatchToDoSuccess implements Action {
  readonly type = ToDoListActionTypes.PATCH_TODO_SUCCESS;

  constructor(public payload: PatchRes) {}
}
export class PatchToDoFailedId implements Action {
  readonly type = ToDoListActionTypes.PATCH_TODO_FAILED_ID;

  constructor(public payload?: any) {}
}
export class DeleteToDo implements Action {
  readonly type = ToDoListActionTypes.DELETE_TODO;

  constructor(public payload: ToDo) {}
}
export class DeleteToDoSuccess implements Action {
  readonly type = ToDoListActionTypes.DELETE_TODO_SUCCESS;

  constructor(public payload: ToDo) {}
}
export class DeleteToDoFailedId implements Action {
  readonly type = ToDoListActionTypes.DELETE_TODO_FAILED_ID;

  constructor(public payload?: any) {}
}
export class AddToDo implements Action {
  readonly type = ToDoListActionTypes.ADD_TODO;

  constructor(public payload: ToDo) {}
}

export class AddToDoSuccess implements Action {
  readonly type = ToDoListActionTypes.ADD_TODO_SUCCESS;

  constructor(public payload: ToDo) {}
}

export class AddToDoFailed implements Action {
  readonly type = ToDoListActionTypes.ADD_TODO_FAILED;

  constructor(public payload?: any) {}
}

export type ToDoListActions =
  | SetToDoList
  | GetToDoListSuccess
  | GetToDoListFailed
  | PatchToDo
  | PatchToDoSuccess
  | PatchToDoFailedId
  | DeleteToDo
  | DeleteToDoSuccess
  | DeleteToDoFailedId
  | AddToDo
  | AddToDoSuccess
  | AddToDoFailed;
