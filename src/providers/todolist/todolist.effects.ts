import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { ToDoListService } from "./todolist.service";
import {
  ToDoListActionTypes,
  AddToDo,
  AddToDoSuccess,
  PatchToDo,
  GetToDoListSuccess,
  GetToDoListFailed,
  AddToDoFailed,
  PatchToDoSuccess,
  PatchToDoFailedId,
  DeleteToDo,
  DeleteToDoSuccess,
  DeleteToDoFailedId
} from "./todolist.actions";

@Injectable()
export class ToDoListEffects {
  constructor(
    private toDoListService: ToDoListService,
    private actions$: Actions
  ) {}

  @Effect()
  getToDoList$: Observable<Action> = this.actions$.pipe(
    ofType(ToDoListActionTypes.SET_TODO_LIST),
    switchMap(() =>
      this.toDoListService.getTodos().pipe(
        map(data => new GetToDoListSuccess(data)),
        catchError(() => of(new GetToDoListFailed()))
      )
    )
  );

  @Effect()
  addToDo$: Observable<Action> = this.actions$.pipe(
    ofType(ToDoListActionTypes.ADD_TODO),
    map((action: AddToDo) => action.payload),
    switchMap(payload =>
      this.toDoListService.addTodo(payload).pipe(
        map(
          data =>
            new AddToDoSuccess({
              id: null,
              title: data.title,
              completed: false
            })
        ),
        catchError(() => of(new AddToDoFailed()))
      )
    )
  );

  @Effect()
  patchToDo$: Observable<Action> = this.actions$.pipe(
    ofType(ToDoListActionTypes.PATCH_TODO),
    map((action: PatchToDo) => action.payload),
    switchMap(payload =>
      this.toDoListService.patchTodo(payload.todo, payload.values).pipe(
        map(
          () =>
            new PatchToDoSuccess({
              todo: payload.todo,
              values: payload.values
            })
        ),
        catchError(() =>
          of(
            new PatchToDoFailedId({
              todo: payload.todo,
              values: payload.values
            })
          )
        )
      )
    )
  );

  @Effect()
  deleteToDo$: Observable<Action> = this.actions$.pipe(
    ofType(ToDoListActionTypes.DELETE_TODO),
    map((action: DeleteToDo) => action.payload),
    switchMap(payload =>
      this.toDoListService.deleteTodo(payload).pipe(
        map(() => new DeleteToDoSuccess(payload)),
        catchError(() => of(new DeleteToDoFailedId(payload)))
      )
    )
  );
}
