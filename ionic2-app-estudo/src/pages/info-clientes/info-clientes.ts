import { Values } from "./../../app/values";
import { ClienteModel } from "./../../models/cliente-model";
import { ClienteService } from "./../../services/cliente-service";
import { Utils } from "./../../app/utils";
import { Component } from "@angular/core";
import { ClienteDetalhesPage } from "./../cliente-detalhes/cliente-detalhes";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the InfoClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-info-clientes",
  templateUrl: "info-clientes.html"
})
export class InfoClientesPage {
  //seletor das abas
  tabs: string = "pesquisar";

  // controle do usuario logado
  usuarioAutenticado: any;

  // lista de clientes
  resultadoPesquisa: any;

  // validador do campo de pesquisa
  pesquisaValidationForm: FormGroup;

  // controle do botão de submit da pesquisa
  submitPesquisa: boolean = false;

  // lista de clientes favoritos
  clientesFavoritos: any;

  // validador do formulário de cadastro
  clienteCadastroValidationForm: FormGroup;

  // controle do botão de submit do cadastro
  submitCadastro: boolean = false;

  // lista de estados do cadastro de cliente
  listaEstado = Values.listaEstado;

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
    public clienteService: ClienteService
  ) {
    // validador do formulário de cadastro
    this.clienteCadastroValidationForm = this.formBuilder.group({
      nome: new FormControl("", Validators.compose([Validators.required])),
      cnpj: new FormControl(""),
      endereco: new FormControl(""),
      cidade: new FormControl(""),
      estado: new FormControl(""),
      segmento: new FormControl(""),
      favorito: new FormControl(null)
    });

    // validador do campo de pesquisa
    this.pesquisaValidationForm = this.formBuilder.group({
      pesquisa: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  verDetalhesCliente(item) {
    this.resultadoPesquisa = null;
    this.navCtrl.push(ClienteDetalhesPage, { item });
  }

  /*------ Aba Pesquisa --------------------------------------------------------------------*/

  pesquisarClientes() {
    this.submitPesquisa = true;

    if (this.pesquisaValidationForm.valid) {
      this.pesquisarClientesService(
        this.pesquisaValidationForm.controls.pesquisa.value,
        this.usuarioAutenticado.id,
        this.usuarioAutenticado.token
      );
    }
  }

  buscarTodosClientes() {
    this.submitPesquisa = false;

    this.buscarClientesPorUsuarioService(
      this.usuarioAutenticado.id,
      this.usuarioAutenticado.token
    );
  }

  favoritarClientePesquisa(item, index) {
    this.resultadoPesquisa[index].favorito = 1;
    this.salvarClienteFavoritoService(
      item.cliente.id,
      this.usuarioAutenticado.id,
      this.usuarioAutenticado.token
    );
  }

  desfavoritarClientePesquisa(item, index) {
    this.resultadoPesquisa[index].favorito = 0;
    this.removerClienteFavoritoService(
      item.cliente.id,
      this.usuarioAutenticado.id,
      this.usuarioAutenticado.token
    );
  }

  /*------ Aba Favoritos --------------------------------------------------------------------*/

  buscarClientesFavoritos() {
    this.clientesFavoritos = [];
    this.buscarClientesFavoritosService(
      this.usuarioAutenticado.id,
      this.usuarioAutenticado.token
    );
  }

  desfavoritarCliente(item, index) {
    /* Nesse método, além de desmarcar o favorito da lista de favoritos
    temos que verificar se a lista de pesquisa contém o mesmo item
    que está sendo desfavoritado na lista de favoritos */

    // verifica se o item que está sendo desfavoritado, está na lista de pesquisa
    // e se estiver pega o indice dele
    let indexClientePesquisa = this.resultadoPesquisa.indexOf(
      this.resultadoPesquisa.find(x => x.cliente.id == item.cliente.id)
    );

    // se o indice não for -1 é porque ele existe na lista de pesquisa
    // e então desfavorita esse item também na lista de pesquisa
    if (indexClientePesquisa !== -1) {
      // aqui apenas desmarca a estrela de favorito
      this.resultadoPesquisa[indexClientePesquisa].favorito = 0;
    }

    // aqui já remove o item da lista
    this.clientesFavoritos.splice(index, 1);

    this.removerClienteFavoritoService(
      item.cliente.id,
      this.usuarioAutenticado.id,
      this.usuarioAutenticado.token
    );
  }

  /*------ Aba Cadastro --------------------------------------------------------------------*/

  novoCliente() {
    this.submitCadastro = true;

    if (this.clienteCadastroValidationForm.valid) {
      let novoCliente = new ClienteModel().objetoClienteCadastro(
        this.clienteCadastroValidationForm
      );

      this.registrarNovoClienteService(
        this.usuarioAutenticado.id,
        Number(this.clienteCadastroValidationForm.controls.favorito.value),
        novoCliente,
        this.usuarioAutenticado.token
      );
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  /*------ Requisições ao Webservice --------------------------------------------------------------------*/

  registrarNovoClienteService(
    idUsuario: any,
    favorito: any,
    novoCliente: any,
    token: string
  ) {
    let loader = this.loading.create({
      content: "Cadastrando cliente..."
    });

    let body = JSON.stringify(novoCliente);

    loader.present().then(() => {
      this.clienteService
        .registrarNovoClienteService(idUsuario, favorito, body, token)
        .then(result => {
          loader.dismiss();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.clienteCadastroValidationForm.reset();
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

  pesquisarClientesService(pesquisa: string, idUsuario: any, token: string) {
    let loader = this.loading.create({
      content: "Pesquisando..."
    });

    loader.present().then(() => {
      this.clienteService
        .pesquisarClientesService(pesquisa, idUsuario, token)
        .then(result => {
          loader.dismiss();
          this.resultadoPesquisa = result;
          console.log(result);
          this.submitPesquisa = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          this.submitPesquisa = false;
        });
    });
  }

  buscarClientesPorUsuarioService(idUsuario: any, token: string) {
    let loader = this.loading.create({
      content: "Buscando clientes..."
    });

    loader.present().then(() => {
      this.clienteService
        .buscarClientesPorUsuarioService(idUsuario, token)
        .then(result => {
          loader.dismiss();
          this.resultadoPesquisa = result;
          console.log(result);
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
        });
    });
  }

  buscarClientesFavoritosService(idUsuario: any, token: string) {
    let loader = this.loading.create({
      content: "Buscando..."
    });

    loader.present().then(() => {
      this.clienteService
        .buscarClientesFavoritosService(idUsuario, token)
        .then(result => {
          loader.dismiss();
          this.clientesFavoritos = result;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
        });
    });
  }

  salvarClienteFavoritoService(idCliente: any, idUsuario: any, token: string) {
    this.clienteService
      .salvarClienteFavoritoService(idCliente, idUsuario, token)
      .catch(err => {
        this.utils.verificarErro(err.status);
      });
  }

  removerClienteFavoritoService(idCliente: any, idUsuario: any, token: string) {
    this.clienteService
      .removerClienteFavoritoService(idCliente, idUsuario, token)
      .catch(err => {
        this.utils.verificarErro(err.status);
      });
  }
}
