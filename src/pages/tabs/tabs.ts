import { Component } from "@angular/core";

import { ToDoListPage } from "../to-do-list/to-do-list";
import { AddToDoPage } from "../add-to-do/add-to-do";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = ToDoListPage;
  tab2Root = AddToDoPage;

  constructor() {}
}
