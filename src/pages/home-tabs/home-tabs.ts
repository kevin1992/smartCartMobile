import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComprasPage} from "../compras/compras";
import {GruposPage} from "../grupos/grupos";
import {MisComprasPage} from "../mis-compras/mis-compras";
import {HistorialComprasPage} from "../historial-compras/historial-compras";

/**
 * Generated class for the HomeTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-tabs',
  templateUrl: 'home-tabs.html',
})
export class HomeTabsPage {

  tabRoot1=GruposPage;
  tabRoot2=HistorialComprasPage;
  tabRoot3=ComprasPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTabsPage');
  }

}
