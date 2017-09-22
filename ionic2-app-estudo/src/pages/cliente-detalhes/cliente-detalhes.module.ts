import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteDetalhesPage } from './cliente-detalhes';

@NgModule({
  declarations: [
    ClienteDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteDetalhesPage),
  ],
  exports: [
    ClienteDetalhesPage
  ]
})
export class ClienteDetalhesPageModule {}
