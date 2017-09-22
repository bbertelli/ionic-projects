import { NegocioDetalhesPage } from "./../negocio-detalhes/negocio-detalhes";
import { NovoNegocioPage } from "./../novo-negocio/novo-negocio";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the NegociosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-negocios",
  templateUrl: "negocios.html"
})
export class NegociosPage {
  public dataFiltro: string = new Date().toISOString();

  negocios = ["R$ 5.000,00", "R$ 1.750,00", "R$ 35.000,00"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  novaNegociacao() {
    this.navCtrl.push(NovoNegocioPage);
  }

  verDetalhesNegociacao(item) {
    this.navCtrl.push(NegocioDetalhesPage, { item: item });
  }
}
