import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { JsonPlaceholderProvider } from "../../providers/json-placeholder/json-placeholder";

/**
 * Generated class for the AddToDoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private todosService: JsonPlaceholderProvider,
    private toast: ToastController
  ) {}

  addToDo() {
    this.todosService.addTodo(this.todoToAdd).then(() => this.presentToast());
  }

  presentToast() {
    let toast = this.toast.create({
      message: "ToDo was added successfully",
      duration: 3000,
      position: "bottom"
    });

    toast.present();
  }
}
