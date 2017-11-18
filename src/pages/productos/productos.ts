import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalleListaPage} from "../detalle-lista/detalle-lista";

/**
 * Generated class for the ProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  newProducts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeNewProducts();
  }

  initializeNewProducts(){
    this.newProducts=[
      {name:'Agua Mineral 2lts'},
      {name:'Arvejas 500gr'},
      {name:'Detergente Ala 900ml'},
      {name:'Detergente Cif 900ml'},
      {name:'Lavandina 1lt'},
      {name:'Queso 900gr'},
      {name:'Salsa de Tomate 400gr'},
      {name:'Yogurt 1lt'},
    ]
  }

  getItems(product: any) {
    // Reset items back to all of the items
    this.initializeNewProducts();

    // set val to the value of the searchbar
    var val = product.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.newProducts = this.newProducts.filter((newProduct) => {
        return (newProduct.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  newProductSelected(){
    // hacer un INSERT a la lista de productos actual
    this.navCtrl.pop(DetalleListaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }
}
