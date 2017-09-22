import { RestapiServiceProvider } from "./../providers/restapi-service/restapi-service";
import { Injectable } from "@angular/core";

@Injectable()
export class ContatoService {
  constructor(public restapiService: RestapiServiceProvider) {}

  buscarContatosClienteService(idCliente: any, token: string) {
    let params = {};

    return this.restapiService.getRequest(
      "/private/contato/getContatosCliente/" + idCliente,
      params,
      token
    );
  }

  salvarContatoService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/contato/salvarContato",
      params,
      body,
      token
    );
  }

  excluirContatoService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/contato/desativarContato",
      params,
      body,
      token
    );
  }
}
