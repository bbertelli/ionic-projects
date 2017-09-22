import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UltimasVisitasPage } from './ultimas-visitas';

@NgModule({
  declarations: [
    UltimasVisitasPage,
  ],
  imports: [
    IonicPageModule.forChild(UltimasVisitasPage),
  ],
  exports: [
    UltimasVisitasPage
  ]
})
export class UltimasVisitasPageModule {}
