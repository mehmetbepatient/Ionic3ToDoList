import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddToDoPage } from './add-to-do';

@NgModule({
  declarations: [
    AddToDoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddToDoPage),
  ],
})
export class AddToDoPageModule {}
