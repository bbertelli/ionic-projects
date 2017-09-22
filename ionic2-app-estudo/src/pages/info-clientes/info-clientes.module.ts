import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoClientesPage } from './info-clientes';

@NgModule({
  declarations: [
    InfoClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoClientesPage),
  ],
  exports: [
    InfoClientesPage
  ]
})
export class InfoClientesPageModule {}
