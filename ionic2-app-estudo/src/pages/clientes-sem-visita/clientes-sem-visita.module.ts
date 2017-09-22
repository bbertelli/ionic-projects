import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesSemVisitaPage } from './clientes-sem-visita';

@NgModule({
  declarations: [
    ClientesSemVisitaPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesSemVisitaPage),
  ],
  exports: [
    ClientesSemVisitaPage
  ]
})
export class ClientesSemVisitaPageModule {}
