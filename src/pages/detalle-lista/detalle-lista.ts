import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalleCompraPage} from "../detalle-compra/detalle-compra";
import {DetalleProductoPage} from "../detalle-producto/detalle-producto";

/**
 * Generated class for the DetalleListaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-lista',
  templateUrl: 'detalle-lista.html',
})
export class DetalleListaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  productos = [
    {name:'Coca Cola 2.25lt',cantidad:1,precio:50},
    {name:'Arroz 300gr',cantidad:3,precio:12.30},
    {name:'Leche 1lt',cantidad:2,precio:50},
    {name:'Milanesas 1kg',cantidad:1,precio:120}
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleListaPage');
  }

  getTotal(){
    return this.productos.map((p)=>{return p.precio*p.cantidad}).reduce((a, b) => a + b, 0);
  }

  verProducto(producto){
    this.navCtrl.push(DetalleProductoPage);
  }

}
