import { RestapiServiceProvider } from "./../providers/restapi-service/restapi-service";
import { Injectable } from "@angular/core";

@Injectable()
export class VisitaService {
  constructor(public restapiService: RestapiServiceProvider) {}

  registrarVisitaService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/visita/registrarVisita",
      params,
      body,
      token
    );
  }

  agendarVisitaService(body: any, token: string) {
    let params = {};

    return this.restapiService.postRequestPrivateNoContent(
      "/private/visita/agendarVisita",
      params,
      body,
      token
    );
  }

  buscarTodasVisitasTodosClientes(
    idUsuario: any,
    token: string,
    mes: any,
    ano: any
  ) {
    let params = {
      idUsuario: idUsuario,
      cidade: "",
      estado: "",
      mes: mes,
      ano: ano
    };

    return this.restapiService.getRequest(
      "/private/visita/buscarTodasVisitasTodosClientes",
      params,
      token
    );
  }

  buscarTodasVisitasCliente(
    idCliente: any,
    idUsuario: any,
    token: string,
    mes: any,
    ano: any
  ) {
    let params = {
      idCliente: idCliente,
      idUsuario: idUsuario,
      cidade: "",
      estado: "",
      mes: mes,
      ano: ano
    };

    return this.restapiService.getRequest(
      "/private/visita/buscarTodasVisitasCliente",
      params,
      token
    );
  }
}
