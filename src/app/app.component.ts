import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import {ComprasPage} from "../pages/compras/compras";
import {AsociarCompraPage} from "../pages/asociar-compra/asociar-compra";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public rootPage: any;
  public login = LoginPage;
  public compra = ComprasPage;
  public asociarCompra = AsociarCompraPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private push: Push) {
    this.rootPage= this.login; // Aca agrego la pagina principal
    platform.ready().then(() => {
      if(platform.is('android')){
        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
        });

        this.push.rx.notification()
          .subscribe((msg) => {
            alert(msg.title + ': ' + msg.text);
          });
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  openPage(page){
    this.rootPage = page;
  }

  cerrarSesion(){
    window.localStorage.removeItem('smartCart-auth');
    this.openPage(this.login);
    window.location.reload();
  }
}

export const API = {
  URL:'/api/'
};
