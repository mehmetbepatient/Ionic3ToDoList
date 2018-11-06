import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ToDoListService } from "../../providers/todolist/todolist.service";

@IonicPage()
@Component({
  selector: "page-add-to-do",
  templateUrl: "add-to-do.html"
})
export class AddToDoPage {
  public todoToAdd: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todosService: ToDoListService,
    private toast: ToastController
  ) {}

  addToDo() {
    this.todosService
      .addTodo(this.todoToAdd)
      .then(data => this.presentToast(data));
  }

  presentToast(data) {
    let toast = this.toast.create({
      message: `ToDo "${data.title}" was added successfully`,
      duration: 3000,
      position: "bottom"
    });

    toast.present();
  }
}
