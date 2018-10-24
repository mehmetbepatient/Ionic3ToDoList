import { ReponseToDo } from "./../../providers/json-placeholder/json-placeholder";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  JsonPlaceholderProvider,
  ToDo,
  ReponseToDo
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
  private toDoList: Array<ToDo>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todosService: JsonPlaceholderProvider,
    private alertCtrl: AlertController
  ) {}
  ngOnInit(): void {
    console.log("OnInit");
    this.getTodos();
  }
  sortTodos(data) {
    data.sort(function(a, b) {
      return b.id - a.id;
    });
    return data;
  }

  getTodos() {
    this.todosService.getTodos().subscribe(data => {
      this.toDoList = data;
      this.sortTodos(this.toDoList);
    });
  }

  getNewTodo() {
    if (this.todosService.response !== undefined) {
      this.toDoList.push({
        userId: null,
        id: this.generateIdTodo(),
        title: this.todosService.response.title,
        completed: false
      });
      this.sortTodos(this.toDoList);
    }
  }

  generateIdTodo() {
    return this.toDoList.length + 1;
  }
  delete(toDo: ToDo) {
    if (toDo.id > 200) {
      this.toDoList.splice(this.toDoList.indexOf(toDo), 1);
    } else {
      this.todosService.deleteTodo(toDo).subscribe(
        (result: ReponseToDo) => {
          this.toDoList.splice(this.toDoList.indexOf(toDo), 1);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  updateStatus(toDo: ToDo) {
    setTimeout(() => {
      if (toDo.id > 200) {
        toDo.completed = !toDo.completed;
      } else {
        this.todosService
          .patchTodo({ id: toDo.id, completed: !toDo.completed })
          .subscribe(
            (result: ReponseToDo) => {
              toDo.completed = result.completed;
              toDo.id = this.generateIdTodo();
              console.log(result);
            },
            err => {
              console.log(err);
            }
          );
      }
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
            if (toDo.id > 200) {
              toDo.title = data.title;
              toDo.completed = false;
              toDo.id = this.generateIdTodo();
            } else {
              this.todosService
                .patchTodo({ id: toDo.id, title: data.title, completed: false })
                .subscribe(
                  (result: ReponseToDo) => {
                    toDo.title = result.title;
                    toDo.completed = result.completed;
                    toDo.id = this.generateIdTodo();
                    console.log(result);
                  },
                  err => {
                    console.log(err);
                  }
                );
            }
          }
        }
      ]
    });
    prompt.present();
  }
  edit(toDo: ToDo) {
    this.showPrompt(toDo);
  }

  ionViewDidEnter() {
    this.getNewTodo();
    console.log("Enter");
  }
}
