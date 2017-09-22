import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the VisitaDetalhesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-visita-detalhes",
  templateUrl: "visita-detalhes.html"
})
export class VisitaDetalhesPage {
  public dataAgendamento: string = new Date().toISOString();
  public dataVisita: string = new Date().toISOString();
  item;
  habilitarEdicao: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.item = navParams.data.item;
  }

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

  editarVisita() {
    this.verificarEdicao();
  }

  salvarVisita() {
    this.verificarEdicao();
    this.notificarUsuario("Dados salvos com sucesso!");
  }
}
