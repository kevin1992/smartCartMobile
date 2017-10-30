import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {GruposPage} from "../pages/grupos/grupos";
import {ListasPage} from "../pages/listas/listas";

import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {ComprasPage} from "../pages/compras/compras";
import {HistorialComprasPage} from "../pages/historial-compras/historial-compras";
import {HomeTabsPage} from "../pages/home-tabs/home-tabs";
import {ConfiguracionPage} from "../pages/configuracion/configuracion";
import {DetalleCompraPage} from "../pages/detalle-compra/detalle-compra";
import {DetalleGrupoPage} from "../pages/detalle-grupo/detalle-grupo";
import {DetalleListaPage} from "../pages/detalle-lista/detalle-lista";
import {ProductosPage} from "../pages/productos/productos";
import {DetalleProductoPage} from "../pages/detalle-producto/detalle-producto";
import {ListasGrupoPage} from "../pages/listas-grupo/listas-grupo";
import {ClientesPage} from "../pages/clientes/clientes";
import {MisComprasPage} from "../pages/mis-compras/mis-compras";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AsociarCompraGruposPage} from "../pages/asociar-compra-grupos/asociar-compra-grupos";
import {AsociarCompraPage} from "../pages/asociar-compra/asociar-compra";
import {IonicStorageModule} from "@ionic/storage";
import {ApiService} from "../services/api.service";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

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
    ListasPage,
    ConfiguracionPage,
    DetalleCompraPage,
    DetalleGrupoPage,
    AsociarCompraGruposPage,
    AsociarCompraPage,
    DetalleListaPage,
    ClientesPage,
    ProductosPage,
    DetalleProductoPage,
    ListasGrupoPage,
    MisComprasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),HttpModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ComprasPage,
    HomeTabsPage,
    AsociarCompraGruposPage,
    AsociarCompraPage,
    HistorialComprasPage,
    LoginPage,
    GruposPage,
    ListasPage,
    ConfiguracionPage,
    DetalleCompraPage,
    DetalleGrupoPage,
    DetalleListaPage,
    ClientesPage,
    ProductosPage,
    DetalleProductoPage,
    ListasGrupoPage,
    MisComprasPage
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    ApiService,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
