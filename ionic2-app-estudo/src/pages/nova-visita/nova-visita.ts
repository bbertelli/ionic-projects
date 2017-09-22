import { Values } from "./../../app/values";
import { VisitaService } from "./../../services/visita-service";
import { VisitaModel } from "./../../models/visita-model";
import { NovoContatoPage } from "./../novo-contato/novo-contato";
import { ClienteService } from "./../../services/cliente-service";
import { ContatoService } from "./../../services/contato-service";
import { Utils } from "./../../app/utils";
import { Component } from "@angular/core";
import moment from "moment";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ModalController
} from "ionic-angular";

/**
 * Generated class for the NovaVisitaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-nova-visita",
  templateUrl: "nova-visita.html"
})
export class NovaVisitaPage {
  //seletor das abas
  tabs: string = "nao_agendada";

  // objeto vindo da tela anterior
  clienteTelaAnterior: any;

  // objeto cliente que foi selecionado na aba de visita não agendada
  clienteNaoAgendado: any;

  // objeto cliente que foi selecionado na aba de visita agendada
  clienteAgendado: any;

  // lista de contatos do cliente
  listaContatos: any;

  // lista do tempo de duração da visita
  listaDuracao = Values.listaDuracao;

  // lista de clientes do usuario
  listaClientes: any;

  // controle do usuario logado
  usuarioAutenticado: any;

  /* campos para cadastro da visita não agendada */
  inputCliente: any = "";
  inputDataVisita: string = new Date().toISOString();
  inputContatoVisita: any = "";
  inputDuracaoVisita: any = "";
  audioGravado: string;

  /* campos para cadastro da visita agendada */
  inputCliente2: any = "";
  inputDataVisita2: string = new Date().toISOString();
  inputContatoVisita2: any = "";
  inputObjetivoVisita: string = "";

  /* variáveis de validação dos campos da visita não agendada para informar o html
  que o valor é inválido e exibir a mensagem informativa para o usuário */
  validInputCliente: boolean = false;
  validInputDataVisita: boolean = false;
  validInputContatoVisita: boolean = false;
  validInputDuracaoVisita: boolean = false;
  validAudioGravado: boolean = false;

  /* variáveis de validação dos campos da visita agendada para informar o html
  que o valor é inválido e exibir a mensagem informativa para o usuário */
  validInputCliente2: boolean = false;
  validInputDataVisita2: boolean = false;
  validInputContatoVisita2: boolean = false;
  validInputObjetivoVisita: boolean = false;

  // controle do botão de submit da visita não agendada
  submitVisitaNaoAgendada: boolean = false;

  // controle do botão de submit da visita agendada
  submitVisitaAgendada: boolean = false;

  // executa ao inicializar a tela
  ionViewWillEnter() {
    // verifica se o objeto cliente veio da tela anterior ou não
    if (this.clienteTelaAnterior) {
      // se sim, busca o restante das informações
      this.buscarInformacoesClienteService(this.clienteTelaAnterior.id);
    } else {
      if (this.clienteAgendado) {
        this.buscarInformacoesClienteService(this.clienteAgendado.id);
      } else if (this.clienteNaoAgendado) {
        this.buscarInformacoesClienteService(this.clienteNaoAgendado.id);
      } else {
        // se não, busca a lista de clientes do usuário logado
        this.buscarClientesPorUsuarioService();
      }
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public modalCtrl: ModalController,
    public utils: Utils,
    public contatoService: ContatoService,
    public clienteService: ClienteService,
    public visitaService: VisitaService
  ) {
    // pega o objeto cliente vindo da tela anterior
    this.clienteTelaAnterior = navParams.data.item;
  }

  /*------ Aba Não Agendada ------------------------------------------------------------------------------*/

  validarCadastroVisitaNaoAgendada() {
    // verifica se o cliente veio da tela anterior
    if (this.clienteTelaAnterior) {
      // se sim, ele já está selecionado
      this.validInputCliente = true;
    } else {
      // se não, o usuário precisa selecionar um cliente
      this.validInputCliente = this.inputCliente != "" ? true : false;
    }

    // verifica se a data escolhida para a visita não agendada é a mesma de hoje
    // ou menor que hoje, pois a data não pode ser maior que o dia atual
    // para datas futuras o usuário deve usar o agendamento
    this.validInputDataVisita = moment(
      new Date(this.inputDataVisita)
    ).isSameOrBefore(new Date())
      ? true
      : false;

    // verifica se o contato foi selecionado
    this.validInputContatoVisita = this.inputContatoVisita != "" ? true : false;

    // verifica se o tempo de duração foi selecionado
    this.validInputDuracaoVisita = this.inputDuracaoVisita != "" ? true : false;

    // verifica se o áudio foi gravado
    this.validAudioGravado = this.audioGravado ? true : false;

    return (
      this.validInputCliente &&
      this.validInputDataVisita &&
      this.validInputContatoVisita &&
      this.validInputDuracaoVisita &&
      this.validAudioGravado
    );
  }

  gravarAudio() {
    // TODO: chamar tela de gravação de áudio
    // TODO: salvar o arquivo em um diretório temporário

    this.audioGravado = "audio_visita_10239.mp3";
  }

  ouvirAudio() {}

  apagarAudio() {
    // TODO: deletar o arquivo de áudio do diretório temporário

    this.audioGravado = null;
  }

  criarVisitaNaoAgendada() {
    this.submitVisitaNaoAgendada = true;

    let idCliente;
    if (this.clienteTelaAnterior) {
      idCliente = this.clienteTelaAnterior.id;
    } else {
      idCliente = this.clienteNaoAgendado.id;
    }

    if (this.validarCadastroVisitaNaoAgendada()) {
      let novaVisitaNaoAgendada = new VisitaModel().objetoVisitaNaoAgendada(
        idCliente,
        new Date(this.inputDataVisita),
        this.inputContatoVisita,
        this.inputDuracaoVisita,
        this.audioGravado,
        this.usuarioAutenticado.id
      );

      this.registrarVisitaService(
        novaVisitaNaoAgendada,
        this.usuarioAutenticado.token
      );
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  selecionarClienteNaoAgendado(idSelecionado) {
    this.clienteNaoAgendado = this.listaClientes.find(
      lista => lista.cliente.id == idSelecionado
    ).cliente;
    this.buscarInformacoesClienteService(idSelecionado);
  }

  criarNovoContatoNaoAgendado() {
    if (this.clienteTelaAnterior) {
      this.navCtrl.push(NovoContatoPage, { cliente: this.clienteTelaAnterior });
    } else if (this.clienteNaoAgendado) {
      this.navCtrl.push(NovoContatoPage, { cliente: this.clienteNaoAgendado });
    }
  }

  /*------ Aba Agendada ---------------------------------------------------------------------------------*/

  validarCadastroVisitaAgendada() {
    // verifica se o cliente veio da tela anterior
    if (this.clienteTelaAnterior) {
      // se sim, ele já está selecionado
      this.validInputCliente2 = true;
    } else {
      // se não, o usuário precisa selecionar um cliente
      this.validInputCliente2 = this.inputCliente2 != "" ? true : false;
    }

    // verifica se a data escolhida para a visita agendada é a mesma de hoje
    // ou maior que hoje, pois a data não pode ser menor que o dia atual
    // para datas passadas o usuário não deve usar o agendamento
    this.validInputDataVisita2 = moment(
      new Date(this.inputDataVisita2)
    ).isSameOrAfter(new Date())
      ? true
      : false;

    // verifica se o contato foi selecionado
    this.validInputContatoVisita2 =
      this.inputContatoVisita2 != "" ? true : false;

    // verifica se o objetivo da visita foi descrito
    this.validInputObjetivoVisita =
      this.inputObjetivoVisita != "" ? true : false;

    return (
      this.validInputCliente2 &&
      this.validInputDataVisita2 &&
      this.validInputContatoVisita2 &&
      this.validInputObjetivoVisita
    );
  }

  criarVisitaAgendada() {
    this.submitVisitaAgendada = true;

    let idCliente;
    if (this.clienteTelaAnterior) {
      idCliente = this.clienteTelaAnterior.id;
    } else {
      idCliente = this.clienteAgendado.id;
    }

    if (this.validarCadastroVisitaAgendada()) {
      let novaVisitaAgendada = new VisitaModel().objetoVisitaAgendada(
        idCliente,
        new Date(this.inputDataVisita2),
        this.inputContatoVisita2,
        this.inputObjetivoVisita,
        this.usuarioAutenticado.id
      );

      this.agendarVisitaService(
        novaVisitaAgendada,
        this.usuarioAutenticado.token
      );
    } else {
      this.utils.exibirToastErro("Erro! Verifique os campos preenchidos!");
    }
  }

  selecionarClienteAgendado(idSelecionado) {
    this.clienteAgendado = this.listaClientes.find(
      lista => lista.cliente.id == idSelecionado
    ).cliente;
    this.buscarInformacoesClienteService(idSelecionado);
  }

  criarNovoContatoAgendado() {
    if (this.clienteTelaAnterior) {
      this.navCtrl.push(NovoContatoPage, { cliente: this.clienteTelaAnterior });
    } else if (this.clienteAgendado) {
      this.navCtrl.push(NovoContatoPage, { cliente: this.clienteAgendado });
    }
  }

  /*------ Requisições ao Webservice ------------------------------------------------------------------------*/

  registrarVisitaService(visita: any, token: string) {
    let loader = this.loading.create({
      content: "Registrando visita..."
    });

    let body = JSON.stringify(visita);

    loader.present().then(() => {
      this.visitaService
        .registrarVisitaService(body, token)
        .then(result => {
          loader.dismiss();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.navCtrl.pop();
          this.submitVisitaNaoAgendada = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitVisitaNaoAgendada = false;
        });
    });
  }

  agendarVisitaService(visita: any, token: string) {
    let loader = this.loading.create({
      content: "Agendando visita..."
    });

    let body = JSON.stringify(visita);

    loader.present().then(() => {
      this.visitaService
        .agendarVisitaService(body, token)
        .then(result => {
          loader.dismiss();
          this.utils.exibirToastSucesso("Dados salvos com sucesso!");
          this.navCtrl.pop();
          this.submitVisitaAgendada = false;
        })
        .catch(err => {
          loader.dismiss();
          this.utils.verificarErro(err.status);
          console.log(err);
          this.submitVisitaAgendada = false;
        });
    });
  }

  buscarInformacoesClienteService(idCliente) {
    let loader = this.loading.create({
      content: "Carregando informações..."
    });

    loader.present().then(() => {
      // busca informações do usuário logado
      this.utils.buscarInfoUsuario().then(val => {
        if (val) {
          this.usuarioAutenticado = val;

          // busca a lista de contatos do cliente
          this.contatoService
            .buscarContatosClienteService(
              idCliente,
              this.usuarioAutenticado.token
            )
            .then(result => {
              loader.dismiss();
              this.listaContatos = result;
            })
            .catch(err => {
              loader.dismiss();
              this.utils.verificarErro(err.status);
            });
        }
      });
    });
  }

  buscarClientesPorUsuarioService() {
    let loader = this.loading.create({
      content: "Buscando clientes..."
    });

    loader.present().then(() => {
      // busca informações do usuário logado
      this.utils.buscarInfoUsuario().then(val => {
        if (val) {
          this.usuarioAutenticado = val;

          // busca a lista de clientes do usuário logado
          this.clienteService
            .buscarClientesPorUsuarioService(
              this.usuarioAutenticado.id,
              this.usuarioAutenticado.token
            )
            .then(result => {
              loader.dismiss();
              this.listaClientes = result;
            })
            .catch(err => {
              loader.dismiss();
              this.utils.verificarErro(err.status);
            });
        }
      });
    });
  }
}
