import { UltimasVisitasPage } from './../ultimas-visitas/ultimas-visitas';
import { VisitaDetalhesPage } from './../visita-detalhes/visita-detalhes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  public dataFiltro: string = new Date().toISOString();

  public evento = {
    dia: '09 Quarta-feira',
    cidade: 'Indaiatuba-SP',
    cliente: 'ATM Digital Sistemas e Softwares',
    contato: 'Falar com Bruno Bertelli'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  verDetalhesVisita(item) {
    this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  verUltimasVisitas(item) {
    this.navCtrl.push(UltimasVisitasPage, { item: item });
  }

}
