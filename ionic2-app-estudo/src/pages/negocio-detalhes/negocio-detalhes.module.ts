import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NegocioDetalhesPage } from './negocio-detalhes';

@NgModule({
  declarations: [
    NegocioDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(NegocioDetalhesPage),
  ],
  exports: [
    NegocioDetalhesPage
  ]
})
export class NegocioDetalhesPageModule {}
