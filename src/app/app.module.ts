import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AddToDoPage } from "../pages/add-to-do/add-to-do";
import { ToDoListPage } from "../pages/to-do-list/to-do-list";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ToDoListService } from "../providers/todolist/todolist.service";
import { reducer } from "../providers/todolist/todolist.reducer";

@NgModule({
  declarations: [MyApp, AddToDoPage, ToDoListPage, TabsPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({ myApp: reducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AddToDoPage, ToDoListPage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToDoListService
  ]
})
export class AppModule {}
