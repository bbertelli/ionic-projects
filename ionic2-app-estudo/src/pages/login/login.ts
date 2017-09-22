import { LoginService } from "./../../services/login-service";
import { Utils } from "./../../app/utils";
import { DashboardPage } from "./../dashboard/dashboard";
import { Component } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { NavController, LoadingController } from "ionic-angular";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // validador do formulário de login
  validationForm: FormGroup;

  // controle do botão de submit
  submitAttempt: boolean = false;

  // executa ao inicializar a tela
  ionViewDidLoad() {
    this.validarTokenUsuario();
  }

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public utils: Utils,
    public loginService: LoginService
  ) {
    // validador do formulário de login
    this.validationForm = this.formBuilder.group({
      usuario: new FormControl("", Validators.compose([Validators.required])),
      senha: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  submeterAutenticacao() {
    this.submitAttempt = true;

    if (this.validationForm.valid) {
      this.autenticarUsuario();
    }
  }

  acessarSistema(usuarioAutenticado: any) {
    this.navCtrl.setRoot(
      DashboardPage,
      { usuarioLogado: usuarioAutenticado },
      { animate: true, direction: "forward" }
    );
  }

  //------
  //------ Requisições ao Webservice ------
  //----------------------------------------

  autenticarUsuario() {
    let loader = this.loading.create({
      content: "Autenticando..."
    });

    let usuario = this.validationForm.controls.usuario.value;
    let senha = this.utils
      .criptografarSenha(this.validationForm.controls.senha.value)
      .toString();

    loader.present().then(() => {
      this.loginService
        .autenticarUsuarioService(usuario, senha)
        .then(result => {
          loader.dismiss();
          this.utils.salvarInfoUsuario(result);
          this.acessarSistema(result);
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
        });
    });
  }

  validarTokenUsuario() {
    this.utils.buscarInfoUsuario().then(val => {
      if (val) {
        let loader = this.loading.create({
          content: "Autenticando..."
        });

        loader.present().then(() => {
          this.loginService
            .verificarTokenService(val)
            .then(result => {
              loader.dismiss();
              this.acessarSistema(result);
            })
            .catch(err => {
              loader.dismiss();
              this.utils.deslogarUsuario();
            });
        });
      }
    });
  }
}
