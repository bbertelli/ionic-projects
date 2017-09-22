import { VisitaService } from "./../../services/visita-service";
import { Values } from "./../../app/values";
import { ClienteModel } from "./../../models/cliente-model";
import { ClienteService } from "./../../services/cliente-service";
import { ContatoService } from "./../../services/contato-service";
import { Utils } from "./../../app/utils";
import { NovoNegocioPage } from "./../novo-negocio/novo-negocio";
import { NovaVisitaPage } from "./../nova-visita/nova-visita";
import { NegocioDetalhesPage } from "./../negocio-detalhes/negocio-detalhes";
import { InfoContatoPage } from "./../info-contato/info-contato";
import { NovoContatoPage } from "./../novo-contato/novo-contato";
import { VisitaDetalhesPage } from "./../visita-detalhes/visita-detalhes";
import { Component } from "@angular/core";
import moment from "moment";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

/**
 * Generated class for the ClienteDetalhesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-cliente-detalhes",
  templateUrl: "cliente-detalhes.html"
})
export class ClienteDetalhesPage {
  //seletor das abas
  tabs: string = "resumo";

  // controle do usuario logado
  usuarioAutenticado: any;

  // objeto vindo da tela anterior
  cliente: any;

  // controle de edição das informações do cliente
  habilitarEdicaoCliente: boolean = false;

  // validador do formulário de informações do cliente
  clienteValidationForm: FormGroup;

  // controle do botão de submit do formulário de edição do cliente
  submitEdicao: boolean = false;

  // lista de estados do cadastro de cliente
  listaEstado = Values.listaEstado;

  // lista de visitas
  listaVisitas: any;

  // controle do filtro por data
  dataFiltroVisitas: string = new Date().toISOString();

  // controle do filtro por data
  dataFiltroNegocios: string = new Date().toISOString();

  negocios = ["R$ 5.000,00", "R$ 1.750,00", "R$ 35.000,00"];

  // lista de contatos do cliente
  listaContatos;

  // executa ao inicializar a tela
  ionViewWillEnter() {
    this.utils.buscarInfoUsuario().then(val => {
      if (val) {
        this.usuarioAutenticado = val;

        this.buscarContatosClienteService(
          this.cliente.id,
          this.usuarioAutenticado.token
        );
      }
    });

    // ao voltar para a tela, verifica se a aba que ficou selecionada
    // era a aba de visitas, se sim, faz a busca das visitas para atualizar a lista na tela
    if (this.tabs == "visitas") {
      this.filtrarVisitaPorData();
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public formBuilder: FormBuilder,
    public utils: Utils,
    public contatoService: ContatoService,
    public clienteService: ClienteService,
    public visitaService: VisitaService
  ) {
    // pega o objeto cliente vindo da tela anterior
    this.cliente = navParams.data.item;

    // validador do formulário de cadastro
    this.clienteValidationForm = this.formBuilder.group({
      nome: new FormControl("", Validators.compose([Validators.required])),
      cnpj: new FormControl(""),
      endereco: new FormControl(""),
      cidade: new FormControl(""),
      estado: new FormControl(""),
      segmento: new FormControl(""),
      atrasos: new FormControl(""),
      valorAtrasos: new FormControl(""),
      contatoPadrao: new FormControl("")
    });
  }

  /*------ Aba Resumo do Cliente --------------------------------------------------------------------*/

  habilitarDesabilitarEdicaoCliente() {
    this.habilitarEdicaoCliente = !this.habilitarEdicaoCliente;
  }

  atualizarCliente() {
    this.submitEdicao = true;

    if (this.clienteValidationForm.valid) {
      let cliente = new ClienteModel().objetoClienteAtualizarCadastro(
        this.cliente,
        this.clienteValidationForm
      );

      this.atualizarCadastroClienteService(
        cliente,
        this.usuarioAutenticado.token
      );
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  excluirCliente() {
    this.exibirAlertaExclusaoCliente();
  }

  exibirAlertaExclusaoCliente() {
    let confirm = this.alertCtrl.create({
      title: "Excluir cliente",
      message: "Deseja mesmo excluir esse cliente?",
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
            this.excluirClienteService(
              this.cliente,
              this.usuarioAutenticado.token
            );
          }
        }
      ]
    });
    confirm.present();
  }

  /*------ Aba Visitas --------------------------------------------------------------------*/

  novaVisita(item) {
    this.navCtrl.push(NovaVisitaPage, { item: item });
  }

  verDetalhesVisita(item) {
    this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  ouvirRegistroVisita(item) {
    //this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  filtrarVisitaPorData() {
    this.buscarTodasVisitasCliente(
      this.cliente.id,
      this.pegarMesDataFiltro(),
      this.pegarAnoDataFiltro()
    );
  }

  pegarMesDataFiltro() {
    return moment(new Date(this.dataFiltroVisitas)).format("MM");
  }

  pegarAnoDataFiltro() {
    return moment(new Date(this.dataFiltroVisitas)).format("YYYY");
  }

  /*------ Aba de Negociações --------------------------------------------------------------------------*/

  novaNegociacao() {
    this.navCtrl.push(NovoNegocioPage);
  }

  verDetalhesNegociacao(item) {
    this.navCtrl.push(NegocioDetalhesPage, { item: item });
  }

  /*------ Aba Contatos --------------------------------------------------------------------------------*/

  novoContato() {
    this.navCtrl.push(NovoContatoPage, { cliente: this.cliente });
  }

  verDetalhesContato(contato) {
    this.navCtrl.push(InfoContatoPage, {
      contato: contato,
      cliente: this.cliente
    });
  }

  /*------ Requisições ao Webservice --------------------------------------------------------------------*/

  buscarTodasVisitasCliente(idCliente: any, mes: any, ano: any) {
    let loader = this.loading.create({
      content: "Buscando visitas..."
    });

    loader.present().then(() => {
      this.visitaService
        .buscarTodasVisitasCliente(
          idCliente,
          this.usuarioAutenticado.id,
          this.usuarioAutenticado.token,
          mes,
          ano
        )
        .then(result => {
          loader.dismiss();
          this.listaVisitas = result;
          console.log(result);
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
        });
    });
  }

  buscarContatosClienteService(idCliente: any, token: string) {
    this.contatoService
      .buscarContatosClienteService(idCliente, token)
      .then(result => {
        this.listaContatos = result;
      })
      .catch(err => {
        this.utils.verificarErro(err.status);
      });
  }

  atualizarCadastroClienteService(cliente: any, token: string) {
    let loader = this.loading.create({
      content: "Atualizando cadastro..."
    });

    let body = JSON.stringify(cliente);

    loader.present().then(() => {
      this.clienteService
        .atualizarCadastroClienteService(body, token)
        .then(result => {
          loader.dismiss();
          this.habilitarDesabilitarEdicaoCliente();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.submitEdicao = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitEdicao = false;
        });
    });
  }

  excluirClienteService(cliente: any, token: string) {
    let loader = this.loading.create({
      content: "Excluindo..."
    });

    let body = JSON.stringify(cliente);

    loader.present().then(() => {
      this.clienteService
        .excluirClienteService(body, token)
        .then(result => {
          loader.dismiss();
          this.navCtrl.pop();
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitEdicao = false;
        });
    });
  }
}
