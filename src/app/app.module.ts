import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {GruposPage} from "../pages/grupos/grupos";

import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {QRScanner} from "@ionic-native/qr-scanner";
import {ComprasPage} from "../pages/compras/compras";
import {HistorialComprasPage} from "../pages/historial-compras/historial-compras";
import {HomeTabsPage} from "../pages/home-tabs/home-tabs";
import {ConfiguracionPage} from "../pages/configuracion/configuracion";
import {DetalleCompraPage} from "../pages/detalle-compra/detalle-compra";
import {DetalleGrupoPage} from "../pages/detalle-grupo/detalle-grupo";
import {DetalleListaPage} from "../pages/detalle-lista/detalle-lista";
import {DetalleProductoPage} from "../pages/detalle-producto/detalle-producto";
import {ListasGrupoPage} from "../pages/listas-grupo/listas-grupo";
import {MisComprasPage} from "../pages/mis-compras/mis-compras";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '61b788df'
  },
  'push': {
    'sender_id': '191023148223',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ComprasPage,
    HomeTabsPage,
    HistorialComprasPage,
    LoginPage,
    GruposPage,
    ConfiguracionPage,
    DetalleCompraPage,
    DetalleGrupoPage,
    DetalleListaPage,
    DetalleProductoPage,
    ListasGrupoPage,
    MisComprasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ComprasPage,
    HomeTabsPage,
    HistorialComprasPage,
    LoginPage,
    GruposPage,
    ConfiguracionPage,
    DetalleCompraPage,
    DetalleGrupoPage,
    DetalleListaPage,
    DetalleProductoPage,
    ListasGrupoPage,
    MisComprasPage
  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
