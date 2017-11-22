import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import {ComprasPage} from "../pages/compras/compras";
import {AsociarCompraGruposPage} from "../pages/asociar-compra-grupos/asociar-compra-grupos";
import {GruposPage} from "../pages/grupos/grupos";
import {ApiService} from "../services/api.service";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('mycontent') nav: Nav;
  public rootPage: any;
  public login = LoginPage;
  public compra = ComprasPage;
  public grupos = GruposPage;
  public asociarCompraGrupos = AsociarCompraGruposPage;

  constructor(platform: Platform, statusBar: StatusBar, public apiService: ApiService, splashScreen: SplashScreen, private push: Push) {
    this.rootPage = this.login; // Aca agrego la pagina principal
    platform.ready().then(() => {

      let api_url = window.localStorage.getItem('smart-cart-api-url');

      if (api_url) {
        API.URL = api_url;
      }

      if (platform.is('android')) {
        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
          DEVICE_TOKEN = t.token;

          if (api_url) {
            this.apiService.post(API.URL + "clients/deviceToken/", {device_token: DEVICE_TOKEN}, {}).subscribe(() => {

              }
            );
          }

        })
        ;

        this.push.rx.notification()
          .subscribe((msg) => {
            let data: any = msg.payload;
            alert(msg.text);
            if (data.groupId) {
              this.apiService.get(API.URL + 'groups/' + data.groupId + "/purchases/" + data.purchaseId, {}, {}).subscribe((compra) => {

                if (!compra.products) {
                  compra.products = [];
                }
                compra.products.forEach((p) => {
                  p.count = p.pivot.count;
                  p.count = parseInt(p.count);
                  p.price = parseInt(p.price);
                });

                this.nav.setRoot(ComprasPage, {compra: compra});
              });
            }
          });
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  openPage(page) {
    this.rootPage = page;
  }

  cerrarSesion() {
    window.localStorage.removeItem('smartCart-auth');
    this.openPage(this.login);
    window.location.reload();
  }

  goToPage(page) {
    this.nav.setRoot(page);
  }
}


export let API = {
  URL: '/api/'
};

export let DEVICE_TOKEN = null;


/*
export const API = {
  URL: 'http://24dcfe65.ngrok.io/api/'
};
*/

