import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoContatoPage } from './novo-contato';

@NgModule({
  declarations: [
    NovoContatoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoContatoPage),
  ],
  exports: [
    NovoContatoPage
  ]
})
export class NovoContatoPageModule {}
