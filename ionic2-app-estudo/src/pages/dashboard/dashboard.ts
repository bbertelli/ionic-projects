import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  usuarioAutenticado: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.usuarioAutenticado = navParams.get("usuarioLogado");
  }
}
