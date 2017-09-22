import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the NovoNegocioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-novo-negocio",
  templateUrl: "novo-negocio.html"
})
export class NovoNegocioPage {
  novoCliente: boolean = false;
  novoContato: boolean = false;
  clientes: string;
  contatos: string;

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

  novoNegocio() {
    this.notificarUsuario("Dados salvos com sucesso!");
    this.navCtrl.pop();
  }

  cadastrarNovoCliente(selectedValue: any) {
    this.novoCliente = true;
  }

  cadastrarNovoContato(selectedValue: any) {
    this.novoContato = true;
  }
}
