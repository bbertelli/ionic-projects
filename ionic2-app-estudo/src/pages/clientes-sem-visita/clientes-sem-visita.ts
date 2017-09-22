import { ClienteDetalhesPage } from './../cliente-detalhes/cliente-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClientesSemVisitaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clientes-sem-visita',
  templateUrl: 'clientes-sem-visita.html',
})
export class ClientesSemVisitaPage {

  filtroDias: string = "qtd1";

  clientes = [
    'Cliente 1234',
    'Cliente 68878',
    'Cliente adfg54'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  verDetalhesCliente(item) {
    this.navCtrl.push(ClienteDetalhesPage, { item: item });
  }

}
