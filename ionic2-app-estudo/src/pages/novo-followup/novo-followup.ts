import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the NovoFollowupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-novo-followup",
  templateUrl: "novo-followup.html"
})
export class NovoFollowupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {}

  notificarUsuario(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  novoFollowup() {
    this.notificarUsuario("Dados salvos com sucesso!");
    this.navCtrl.pop();
  }
}
