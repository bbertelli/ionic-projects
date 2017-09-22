import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Md5 } from "ts-md5/dist/md5";

@Injectable()
export class Utils {
  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {}

  salvarInfoUsuario(usuarioLogado: any) {
    this.storage.set("usuarioLogado", usuarioLogado);
  }

  buscarInfoUsuario() {
    return this.storage.get("usuarioLogado");
  }

  deslogarUsuario() {
    this.storage.set("usuarioLogado", null);
  }

  criptografarSenha(senha: string) {
    return Md5.hashStr(senha);
  }

  exibirAlerta(titulo: string, mensagem: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      message: mensagem,
      buttons: ["OK"]
    });
    alert.present();
  }

  exibirToastSucesso(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      cssClass: "toast-sucesso"
    });
    toast.present();
  }

  exibirToastErro(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      cssClass: "toast-erro"
    });
    toast.present();
  }

  verificarErro(erro: any) {
    if (erro == 401) {
      this.exibirAlerta(
        "Login Inválido",
        "Usuário ou senha não são válidos no sistema!"
      );
    } else if (erro == 500) {
      this.exibirAlerta(
        "Erro no Servidor",
        "Ocorreu um erro interno do servidor, por favor tente novamente." +
          "\nSe o problema persistir entre em contato com o administrador do sistema."
      );
    } else {
      this.exibirAlerta(
        "Erro Desconhecido",
        "Ocorreu um erro desconhecido, por favor entre em contato com o administrador do sistema."
      );
    }
  }
}
