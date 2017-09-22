import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from "./app.component";
import { LoginPage } from "../pages/login/login";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { AgendaPage } from "./../pages/agenda/agenda";
import { InfoClientesPage } from "./../pages/info-clientes/info-clientes";
import { ClienteDetalhesPage } from "./../pages/cliente-detalhes/cliente-detalhes";
import { VisitaDetalhesPage } from "./../pages/visita-detalhes/visita-detalhes";
import { NovoContatoPage } from "./../pages/novo-contato/novo-contato";
import { InfoContatoPage } from "./../pages/info-contato/info-contato";
import { NegociosPage } from "./../pages/negocios/negocios";
import { NegocioDetalhesPage } from "./../pages/negocio-detalhes/negocio-detalhes";
import { NovoNegocioPage } from "./../pages/novo-negocio/novo-negocio";
import { NovoFollowupPage } from "./../pages/novo-followup/novo-followup";
import { NovaVisitaPage } from "./../pages/nova-visita/nova-visita";
import { UltimasVisitasPage } from "./../pages/ultimas-visitas/ultimas-visitas";
import { ClientesSemVisitaPage } from "./../pages/clientes-sem-visita/clientes-sem-visita";
import { VisitasPage } from "./../pages/visitas/visitas";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RestapiServiceProvider } from "../providers/restapi-service/restapi-service";
import { Utils } from "./utils";
import { LoginService } from "./../services/login-service";
import { ClienteService } from "./../services/cliente-service";
import { ContatoService } from "./../services/contato-service";
import { VisitaService } from "./../services/visita-service";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    AgendaPage,
    InfoClientesPage,
    ClienteDetalhesPage,
    VisitaDetalhesPage,
    NovoContatoPage,
    InfoContatoPage,
    NegociosPage,
    NegocioDetalhesPage,
    NovoNegocioPage,
    NovoFollowupPage,
    NovaVisitaPage,
    UltimasVisitasPage,
    ClientesSemVisitaPage,
    VisitasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ""
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    AgendaPage,
    InfoClientesPage,
    ClienteDetalhesPage,
    VisitaDetalhesPage,
    NovoContatoPage,
    InfoContatoPage,
    NegociosPage,
    NegocioDetalhesPage,
    NovoNegocioPage,
    NovoFollowupPage,
    NovaVisitaPage,
    UltimasVisitasPage,
    ClientesSemVisitaPage,
    VisitasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestapiServiceProvider,
    Utils,
    LoginService,
    ClienteService,
    ContatoService,
    VisitaService
  ]
})
export class AppModule {}
