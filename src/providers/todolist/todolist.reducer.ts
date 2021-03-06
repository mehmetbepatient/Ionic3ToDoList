import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ToDoListActionTypes, ToDoListActions } from "./todolist.actions";
import { ToDo } from "./todolist.service";

export interface AppState {
  toDoList: Array<ToDo>;
}

export const initialState: AppState = { toDoList: [] };

export function reducer(
  state: AppState = initialState,
  action: ToDoListActions
): AppState {
  switch (action.type) {
    case ToDoListActionTypes.SET_TODO_LIST:
      return state;

    case ToDoListActionTypes.GET_TODO_LIST_SUCCESS:
      return { toDoList: [...action.payload] };

    case ToDoListActionTypes.GET_TODO_LIST_FAILED:
      return state;

    case ToDoListActionTypes.ADD_TODO:
      return state;

    case ToDoListActionTypes.ADD_TODO_SUCCESS:
      return {
        toDoList: [
          ...state.toDoList,
          {
            id: Math.max(...state.toDoList.map(toDo => toDo.id)) + 1,
            title: action.payload.title,
            completed: action.payload.completed
          }
        ]
      };

    case ToDoListActionTypes.ADD_TODO_FAILED:
      return state;

    case ToDoListActionTypes.PATCH_TODO:
      return state;

    case ToDoListActionTypes.PATCH_TODO_SUCCESS:
      state.toDoList.splice(state.toDoList.indexOf(action.payload.todo), 1);
      return {
        toDoList: [
          ...state.toDoList,
          {
            id: Math.max(...state.toDoList.map(toDo => toDo.id)) + 1,
            title: action.payload.values.title || action.payload.todo.title,
            completed: action.payload.values.completed
          }
        ]
      };

    case ToDoListActionTypes.PATCH_TODO_FAILED_ID:
      state.toDoList.splice(state.toDoList.indexOf(action.payload.todo), 1);
      return {
        toDoList: [
          ...state.toDoList,
          {
            id: Math.max(...state.toDoList.map(toDo => toDo.id)) + 1,
            title: action.payload.values.title || action.payload.todo.title,
            completed: action.payload.values.completed
          }
        ]
      };

    case ToDoListActionTypes.DELETE_TODO:
      return state;

    case ToDoListActionTypes.DELETE_TODO_SUCCESS:
      state.toDoList.splice(state.toDoList.indexOf(action.payload), 1);
      return {
        toDoList: [...state.toDoList]
      };

    case ToDoListActionTypes.DELETE_TODO_FAILED_ID:
      state.toDoList.splice(state.toDoList.indexOf(action.payload), 1);
      return {
        toDoList: [...state.toDoList]
      };

    default:
      return state;
  }
}

export const selectToDoList = createFeatureSelector<AppState>("myApp");

export const selectFeatureToDoListCompleted = createSelector(
  selectToDoList,
  (state: AppState) =>
    state.toDoList.filter(toDo => toDo.completed).sort((a, b) => b.id - a.id)
);
export const selectFeatureToDoListNotCompleted = createSelector(
  selectToDoList,
  (state: AppState) =>
    state.toDoList.filter(toDo => !toDo.completed).sort((a, b) => b.id - a.id)
);
