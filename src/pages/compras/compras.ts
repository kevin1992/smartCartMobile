import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalleProductoPage} from "../detalle-producto/detalle-producto";

/**
 * Generated class for the ComprasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compra;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.compra = this.navParams.get('compra');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

  verProducto(p){
    this.navCtrl.push(DetalleProductoPage,{product:p});
  }

  getTotal(){
    return this.compra.products.map((p)=>{return p.price*p.count}).reduce((a, b) => a + b, 0);
  }
}
