import { AddToDo } from "./../../providers/todolist/todolist.actions";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../providers/todolist/todolist.reducer";

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
    private toast: ToastController,
    private store: Store<AppState>
  ) {}

  addToDo() {
    this.store.dispatch(new AddToDo(this.todoToAdd));
    this.presentToast(this.todoToAdd);
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
