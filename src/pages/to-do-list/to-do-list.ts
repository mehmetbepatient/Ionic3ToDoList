import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  ToDoListService,
  ToDo
} from "../../providers/todolist/todolist.service";
import {
  AppState,
  selectFeatureToDoListCompleted,
  selectFeatureToDoListNotCompleted
} from "../../providers/todolist/todolist.reducer";

/**
 * Generated class for the ToDoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-to-do-list",
  templateUrl: "to-do-list.html"
})
export class ToDoListPage implements OnInit {
  toDoListCompleted$: Observable<ToDo[]>;
  toDoListNotCompleted$: Observable<ToDo[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todosService: ToDoListService,
    private alertCtrl: AlertController,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.toDoListCompleted$ = this.store.pipe(
      select(selectFeatureToDoListCompleted)
    );
    this.toDoListNotCompleted$ = this.store.pipe(
      select(selectFeatureToDoListNotCompleted)
    );
  }

  delete(toDo: ToDo) {
    this.todosService.deleteTodo(toDo);
  }

  updateStatus(toDo: ToDo) {
    setTimeout(() => {
      this.todosService.patchTodo(toDo, {
        completed: !toDo.completed
      });
    }, 500);
  }
  edit(toDo: ToDo) {
    const prompt = this.alertCtrl.create({
      title: "Edit Selected ToDo",
      message: "Enter a new Task",
      inputs: [
        {
          name: "title",
          placeholder: "ToDo"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log("Save clicked");
            this.todosService.patchTodo(toDo, {
              title: data.title,
              completed: false
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
