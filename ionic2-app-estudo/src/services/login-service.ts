import { RestapiServiceProvider } from "./../providers/restapi-service/restapi-service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
  constructor(public restapiService: RestapiServiceProvider) {}

  autenticarUsuarioService(usuario: string, senha: string) {
    let params = {
      usuario: usuario,
      senha: senha
    };

    return this.restapiService.postRequest("/login", params);
  }

  verificarTokenService(usuarioLogado: any) {
    let params = { token: usuarioLogado.token };

    return this.restapiService.postRequest("/verificarToken", params);
  }
}
