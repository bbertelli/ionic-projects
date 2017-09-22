import { NovoFollowupPage } from "./../novo-followup/novo-followup";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the NegocioDetalhesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-negocio-detalhes",
  templateUrl: "negocio-detalhes.html"
})
export class NegocioDetalhesPage {
  tabs: string = "detalhes";
  habilitarEdicao: boolean = false;

  followups = ["01/08/2017", "15/05/2017"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {}

  verificarEdicao() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  notificarUsuario(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  editarNegocio() {
    this.verificarEdicao();
  }

  salvarNegocio() {
    this.verificarEdicao();
    this.notificarUsuario("Dados salvos com sucesso!");
  }

  novoFollowup() {
    this.navCtrl.push(NovoFollowupPage);
  }

  verTextoFollowup() {
    //this.navCtrl.push(NovaVisitaPage);
  }

  ouvirFollowup() {
    //this.navCtrl.push(NovaVisitaPage);
  }
}
