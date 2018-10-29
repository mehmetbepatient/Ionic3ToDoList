import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  JsonPlaceholderProvider,
  ToDo
} from "../../providers/json-placeholder/json-placeholder";

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
    private todosService: JsonPlaceholderProvider,
    private alertCtrl: AlertController
  ) {}
  ngOnInit(): void {
    this.toDoListCompleted$ = this.todosService.toDoListCompleted$;
    this.toDoListNotCompleted$ = this.todosService.toDoListNotCompleted$;
  }

  delete(toDo: ToDo) {
    this.todosService.deleteTodo(toDo);
  }

  updateStatus(toDo: ToDo) {
    setTimeout(() => {
      this.todosService.patchTodo(toDo, {
        title: toDo.title,
        completed: !toDo.completed
      });
    }, 500);
  }
  showPrompt(toDo: ToDo) {
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
  edit(toDo: ToDo) {
    this.showPrompt(toDo);
  }
}
