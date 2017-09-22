import { RestapiServiceProvider } from "./../providers/restapi-service/restapi-service";
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService {
  constructor(public restapiService: RestapiServiceProvider) {}

  registrarNovoClienteService(
    idUsuario: any,
    favorito: any,
    body: any,
    token: string
  ) {
    let params = {
      idUsuario: idUsuario,
      favorito: favorito
    };

    return this.restapiService.postRequestPrivateNoContent(
      "/private/cliente/registrarNovoCliente",
      params,
      body,
      token
    );
  }

  atualizarCadastroClienteService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/cliente/atualizarCliente",
      params,
      body,
      token
    );
  }

  excluirClienteService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/cliente/desativarCliente",
      params,
      body,
      token
    );
  }

  pesquisarClientesService(pesquisa: string, idUsuario: any, token: string) {
    let params = {
      nome: pesquisa,
      cidade: "",
      estado: "",
      idUsuario: idUsuario
    };

    return this.restapiService.getRequest(
      "/private/cliente/buscarClientesPorFiltros",
      params,
      token
    );
  }

  buscarClientesPorUsuarioService(idUsuario: any, token: string) {
    let params = {};

    return this.restapiService.getRequest(
      "/private/cliente/buscarClientesPorIdUsuario/" + idUsuario,
      params,
      token
    );
  }

  buscarClientesFavoritosService(idUsuario: any, token: string) {
    let params = {};

    return this.restapiService.getRequest(
      "/private/cliente/buscarClientesFavoritos/" + idUsuario,
      params,
      token
    );
  }

  salvarClienteFavoritoService(idCliente: any, idUsuario: any, token: string) {
    let params = {
      idCliente: idCliente,
      idUsuario: idUsuario
    };

    return this.restapiService.getRequestNoContent(
      "/private/cliente/salvarFavorito",
      params,
      token
    );
  }

  removerClienteFavoritoService(idCliente: any, idUsuario: any, token: string) {
    let params = {
      idCliente: idCliente,
      idUsuario: idUsuario
    };

    return this.restapiService.getRequestNoContent(
      "/private/cliente/removerFavorito",
      params,
      token
    );
  }
}
