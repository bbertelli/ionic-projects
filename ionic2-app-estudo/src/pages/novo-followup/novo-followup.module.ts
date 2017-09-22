import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoFollowupPage } from './novo-followup';

@NgModule({
  declarations: [
    NovoFollowupPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoFollowupPage),
  ],
  exports: [
    NovoFollowupPage
  ]
})
export class NovoFollowupPageModule {}
