import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaVisitaPage } from './nova-visita';

@NgModule({
  declarations: [
    NovaVisitaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaVisitaPage),
  ],
  exports: [
    NovaVisitaPage
  ]
})
export class NovaVisitaPageModule {}
