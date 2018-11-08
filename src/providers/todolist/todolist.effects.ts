import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ToDoListService } from "./todolist.service";
import { ToDoListActions, ToDoListActionTypes } from "./todolist.actions";

@Injectable()
export class ToDoListEffects {
  constructor(
    private todosService: ToDoListService,
    private actions$: Actions
  ) {}

  @Effect()
  getToDoList$: Observable<Action> = this.actions$.pipe(
    ofType(ToDoListActionTypes.SET_TODO_LIST),
    mergeMap(() =>
      this.todosService.getTodos().pipe(
        map(data => ({
          type: ToDoListActionTypes.GET_TODO_LIST_SUCCESS,
          payload: data
        })),
        catchError(() => of({ type: ToDoListActionTypes.GET_TODO_LIST_FAILED }))
      )
    )
  );

  @Effect()
  addToDo$: Observable<Action> = this.actions$.pipe(
    ofType<ToDoListActions>(ToDoListActionTypes.ADD_TODO),
    mergeMap(action =>
      this.todosService.addTodo(action.payload).pipe(
        map(data => ({
          type: ToDoListActionTypes.ADD_TODO_SUCCESS,
          payload: {
            id: null,
            title: data.title,
            completed: false
          }
        })),
        catchError(() => of({ type: ToDoListActionTypes.ADD_TODO_FAILED }))
      )
    )
  );

  @Effect()
  patchToDo$: Observable<Action> = this.actions$.pipe(
    ofType<ToDoListActions>(ToDoListActionTypes.PATCH_TODO),
    mergeMap(action =>
      this.todosService
        .patchTodo(action.payload.todo, action.payload.values)
        .pipe(
          map(() => ({
            type: ToDoListActionTypes.PATCH_TODO_SUCCESS,
            payload: {
              todo: action.payload.todo,
              values: action.payload.values
            }
          })),
          catchError(() =>
            of({
              type: ToDoListActionTypes.PATCH_TODO_FAILED_ID,
              payload: {
                todo: action.payload.todo,
                values: action.payload.values
              }
            })
          )
        )
    )
  );

  @Effect()
  deleteToDo$: Observable<Action> = this.actions$.pipe(
    ofType<ToDoListActions>(ToDoListActionTypes.DELETE_TODO),
    mergeMap(action =>
      this.todosService.deleteTodo(action.payload).pipe(
        map(() => ({
          type: ToDoListActionTypes.DELETE_TODO_SUCCESS,
          payload: action.payload
        })),
        catchError(() =>
          of({
            type: ToDoListActionTypes.DELETE_TODO_FAILED_ID,
            payload: action.payload
          })
        )
      )
    )
  );
}
