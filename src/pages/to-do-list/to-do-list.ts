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
  toDoList$: Observable<ToDo[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todosService: JsonPlaceholderProvider,
    private alertCtrl: AlertController
  ) {}
  ngOnInit(): void {
    console.log("OnInit");
    this.toDoList$ = this.todosService.toDoList$;
  }

  delete(toDo: ToDo) {
    this.todosService.deleteTodo(toDo);
  }

  updateStatus(toDo: ToDo) {
    setTimeout(() => {
      this.todosService.patchTodo([
        { id: toDo.id, title: toDo.title, completed: !toDo.completed },
        toDo
      ]);
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
            console.log(toDo);

            this.todosService.patchTodo([
              {
                id: toDo.id,
                title: data.title,
                completed: false
              },
              toDo
            ]);
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
