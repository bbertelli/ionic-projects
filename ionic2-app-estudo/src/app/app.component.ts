import { Utils } from "./utils";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LoginPage } from "./../pages/login/login";
import { DashboardPage } from "./../pages/dashboard/dashboard";
import { AgendaPage } from "./../pages/agenda/agenda";
import { InfoClientesPage } from "./../pages/info-clientes/info-clientes";
import { ClientesSemVisitaPage } from "./../pages/clientes-sem-visita/clientes-sem-visita";
import { NegociosPage } from "./../pages/negocios/negocios";
import { VisitasPage } from "./../pages/visitas/visitas";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ icon: string; title: string; component: any; color: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public utils: Utils
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {
        icon: "ios-home-outline",
        title: "Dashboard",
        component: DashboardPage,
        color: "background"
      },
      {
        icon: "ios-bookmarks-outline",
        title: "Agenda",
        component: AgendaPage,
        color: "background"
      },
      {
        icon: "ios-people-outline",
        title: "Clientes",
        component: InfoClientesPage,
        color: "background"
      },
      {
        icon: "ios-alert-outline",
        title: "Clientes sem visita",
        component: ClientesSemVisitaPage,
        color: "background"
      },
      {
        icon: "ios-briefcase-outline",
        title: "Negócios",
        component: NegociosPage,
        color: "background"
      },
      {
        icon: "ios-calendar-outline",
        title: "Visitas",
        component: VisitasPage,
        color: "background"
      },
      {
        icon: "ios-log-out-outline",
        title: "Sair",
        component: LoginPage,
        color: "background"
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    page.color = "divider";

    for (let p of this.pages) {
      if (p.title == page.title) {
        p.color = "divider";
      } else {
        p.color = "background";
      }
    }

    if (page.title == "Sair") {
      page.color = "background";
      this.utils.deslogarUsuario();
    }
  }
}
