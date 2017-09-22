import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitasPage } from './visitas';

@NgModule({
  declarations: [
    VisitasPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitasPage),
  ],
  exports: [
    VisitasPage
  ]
})
export class VisitasPageModule {}
