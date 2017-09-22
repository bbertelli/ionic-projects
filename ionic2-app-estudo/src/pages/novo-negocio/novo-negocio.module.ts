import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoNegocioPage } from './novo-negocio';

@NgModule({
  declarations: [
    NovoNegocioPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoNegocioPage),
  ],
  exports: [
    NovoNegocioPage
  ]
})
export class NovoNegocioPageModule {}
