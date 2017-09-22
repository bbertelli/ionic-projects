import { ContatoService } from "./../../services/contato-service";
import { ContatoModel } from "./../../models/contato-model";
import { Component } from "@angular/core";
import { Utils } from "./../../app/utils";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

/**
 * Generated class for the NovoContatoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-novo-contato",
  templateUrl: "novo-contato.html"
})
export class NovoContatoPage {
  // objeto vindo da tela anterior
  clienteTelaAnterior: any;

  // controle do usuario logado
  usuarioAutenticado: any;

  // validador do formulário de cadastro
  contatoCadastroValidationForm: FormGroup;

  // controle do botão de submit do cadastro
  submitCadastro: boolean = false;

  // executa ao inicializar a tela
  ionViewDidLoad() {
    this.utils.buscarInfoUsuario().then(val => {
      if (val) {
        this.usuarioAutenticado = val;
      }
    });
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public utils: Utils,
    public contatoService: ContatoService
  ) {
    // pega o objeto cliente vindo da tela anterior
    this.clienteTelaAnterior = navParams.data.cliente;

    // validador do formulário de cadastro
    this.contatoCadastroValidationForm = this.formBuilder.group({
      nome: new FormControl("", Validators.compose([Validators.required])),
      fone: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(""),
      apelido: new FormControl(""),
      funcao: new FormControl(""),
      aniversario: new FormControl(""),
      observacao: new FormControl("")
    });
  }

  cadastrarContato() {
    this.submitCadastro = true;

    if (this.contatoCadastroValidationForm.valid) {
      let novoContato = new ContatoModel().objetoContatoCadastro(
        this.clienteTelaAnterior.id,
        this.contatoCadastroValidationForm
      );

      this.salvarContatoService(novoContato, this.usuarioAutenticado.token);
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  salvarContatoService(novoContato: any, token: string) {
    let loader = this.loading.create({
      content: "Cadastrando contato..."
    });

    let body = JSON.stringify(novoContato);

    loader.present().then(() => {
      this.contatoService
        .salvarContatoService(body, token)
        .then(result => {
          loader.dismiss();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.navCtrl.pop();
          this.submitCadastro = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitCadastro = false;
        });
    });
  }
}
