import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitaDetalhesPage } from './visita-detalhes';

@NgModule({
  declarations: [
    VisitaDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitaDetalhesPage),
  ],
  exports: [
    VisitaDetalhesPage
  ]
})
export class VisitaDetalhesPageModule {}
