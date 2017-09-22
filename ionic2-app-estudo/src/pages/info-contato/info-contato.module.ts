import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoContatoPage } from './info-contato';

@NgModule({
  declarations: [
    InfoContatoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoContatoPage),
  ],
  exports: [
    InfoContatoPage
  ]
})
export class InfoContatoPageModule {}
