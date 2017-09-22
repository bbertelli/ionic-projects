import { VisitaService } from "./../../services/visita-service";
import { ClienteService } from "./../../services/cliente-service";
import { VisitaDetalhesPage } from "./../visita-detalhes/visita-detalhes";
import { NovaVisitaPage } from "./../nova-visita/nova-visita";
import { Utils } from "./../../app/utils";
import moment from "moment";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the VisitasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-visitas",
  templateUrl: "visitas.html"
})
export class VisitasPage {
  // controle do filtro por data
  dataFiltroVisitas: string = new Date().toISOString();

  // lista de visitas
  listaVisitas: any;

  // lista de clientes referente ao usuário logado
  listaClientes: any;

  // controle do usuario logado
  usuarioAutenticado: any;

  // cliente que foi selecionado no filtro
  filtroCliente;

  // executa ao inicializar a tela
  ionViewWillEnter() {
    if (this.filtroCliente) {
      this.filtrarPorCliente(this.filtroCliente);
    } else {
      this.buscarInformacoesIniciaisService(
        this.pegarMesDataFiltro(),
        this.pegarAnoDataFiltro()
      );
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public utils: Utils,
    public clienteService: ClienteService,
    public visitaService: VisitaService
  ) {}

  pegarMesDataFiltro() {
    return moment(new Date(this.dataFiltroVisitas)).format("MM");
  }

  pegarAnoDataFiltro() {
    return moment(new Date(this.dataFiltroVisitas)).format("YYYY");
  }

  filtrarPorCliente(idCliente) {
    this.buscarTodasVisitasCliente(
      idCliente,
      this.pegarMesDataFiltro(),
      this.pegarAnoDataFiltro()
    );
  }

  filtrarPorData() {
    if (this.filtroCliente) {
      this.buscarTodasVisitasCliente(
        this.filtroCliente,
        this.pegarMesDataFiltro(),
        this.pegarAnoDataFiltro()
      );
    } else {
      this.buscarTodasVisitasTodosClientes(
        this.pegarMesDataFiltro(),
        this.pegarAnoDataFiltro()
      );
    }
  }

  novaVisita() {
    this.navCtrl.push(NovaVisitaPage);
  }

  verDetalhesVisita(item) {
    this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  ouvirRegistroVisita(item) {
    //this.navCtrl.push(VisitaDetalhesPage, { item: item });
  }

  buscarTodasVisitasTodosClientes(mes: any, ano: any) {
    let loader = this.loading.create({
      content: "Buscando visitas..."
    });

    loader.present().then(() => {
      this.visitaService
        .buscarTodasVisitasTodosClientes(
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

  buscarClientesPorUsuarioService() {
    let loader = this.loading.create({
      content: "Buscando clientes..."
    });

    loader.present().then(() => {
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
    });
  }

  buscarInformacoesIniciaisService(mes: any, ano: any) {
    let loader = this.loading.create({
      content: "Carregando informações..."
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
              this.listaClientes = result;
            })
            .catch(err => {
              this.utils.verificarErro(err.status);
            });

          // busca as visitas de todos os clientes
          // referente ao mês atual
          this.visitaService
            .buscarTodasVisitasTodosClientes(
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
        }
      });
    });
  }
}
