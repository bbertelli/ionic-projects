import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NegociosPage } from './negocios';

@NgModule({
  declarations: [
    NegociosPage,
  ],
  imports: [
    IonicPageModule.forChild(NegociosPage),
  ],
  exports: [
    NegociosPage
  ]
})
export class NegociosPageModule {}
