import { VisitaDetalhesPage } from './../visita-detalhes/visita-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UltimasVisitasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ultimas-visitas',
  templateUrl: 'ultimas-visitas.html',
})
export class UltimasVisitasPage {

  visitas = [
    '01/08/2017',
    '15/05/2017',
    '03/02/2017'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  verDetalhesVisita(item) {
    this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  ouvirRegistroVisita(item) {
    //this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

}
