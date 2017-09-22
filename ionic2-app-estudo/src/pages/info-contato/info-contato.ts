import { Component } from "@angular/core";
import { Utils } from "./../../app/utils";
import { ContatoService } from "./../../services/contato-service";
import { ContatoModel } from "./../../models/contato-model";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

/**
 * Generated class for the InfoContatoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-info-contato",
  templateUrl: "info-contato.html"
})
export class InfoContatoPage {
  // objeto vindo da tela anterior
  clienteTelaAnterior: any;

  // objeto vindo da tela anterior
  contato: any;

  // model para a data de aniversário
  dataAniversario;

  // controle do usuario logado
  usuarioAutenticado: any;

  // validador do formulário de contato
  contatoValidationForm: FormGroup;

  // controle do botão de submit do cadastro
  submitSalvar: boolean = false;

  // executa ao inicializar a tela
  ionViewDidLoad() {
    this.utils.buscarInfoUsuario().then(val => {
      if (val) {
        this.usuarioAutenticado = val;
      }
    });
  }

  // controle de edição das informações do contato
  habilitarEdicao: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public utils: Utils,
    public contatoService: ContatoService
  ) {
    // pega o objeto cliente vindo da tela anterior
    this.clienteTelaAnterior = navParams.data.cliente;

    // pega o objeto contato vindo da tela anterior
    this.contato = navParams.data.contato;

    // cria uma data valida para o ion-datetime
    this.dataAniversario = new Date(this.contato.aniversario).toISOString();

    // validador do formulário de cadastro
    this.contatoValidationForm = this.formBuilder.group({
      nome: new FormControl("", Validators.compose([Validators.required])),
      fone: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(""),
      apelido: new FormControl(""),
      funcao: new FormControl(""),
      aniversario: new FormControl(""),
      observacao: new FormControl("")
    });
  }

  habilitarDesabilitarEdicao() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  salvarContato() {
    this.submitSalvar = true;

    if (this.contatoValidationForm.valid) {
      let contatoAtualizado = new ContatoModel().objetoContatoAtualizar(
        this.contato.id,
        this.clienteTelaAnterior.id,
        this.contatoValidationForm
      );

      this.salvarContatoService(
        contatoAtualizado,
        this.usuarioAutenticado.token
      );
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  excluirContato() {
    this.exibirAlertaExclusao();
  }

  exibirAlertaExclusao() {
    let confirm = this.alertCtrl.create({
      title: "Excluir contato",
      message: "Deseja mesmo excluir esse contato?",
      buttons: [
        {
          text: "Não",
          handler: () => {
            confirm.dismiss;
          }
        },
        {
          text: "Sim",
          handler: () => {
            this.excluirContatoService(
              this.contato,
              this.usuarioAutenticado.token
            );
          }
        }
      ]
    });
    confirm.present();
  }

  /*------ Requisições ao Webservice --------------------------------------------------------------------*/

  salvarContatoService(contatoAtualizado: any, token: string) {
    let loader = this.loading.create({
      content: "Cadastrando contato..."
    });

    let body = JSON.stringify(contatoAtualizado);

    loader.present().then(() => {
      this.contatoService
        .salvarContatoService(body, token)
        .then(result => {
          loader.dismiss();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.navCtrl.pop();
          this.submitSalvar = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitSalvar = false;
        });
    });
  }

  excluirContatoService(contato: any, token: string) {
    let loader = this.loading.create({
      content: "Excluindo..."
    });

    let body = JSON.stringify(contato);

    loader.present().then(() => {
      this.contatoService
        .excluirContatoService(body, token)
        .then(result => {
          loader.dismiss();
          this.navCtrl.pop();
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitSalvar = false;
        });
    });
  }
}
