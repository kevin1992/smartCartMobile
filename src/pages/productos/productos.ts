import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DetalleListaPage} from "../detalle-lista/detalle-lista";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";
import * as _ from 'lodash';

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
  searchName = '';
  lista;

  constructor(public navCtrl: NavController, public apiService:ApiService,public toastCtrl:ToastController, public navParams: NavParams) {
    this.initializeNewProducts();
    this.lista = navParams.get('lista');
  }

  initializeNewProducts(){
    this.newProducts=[];
    this.apiService.get(API.URL + "search/products?name=" + this.searchName , {}, {noLoading: true}).subscribe((data) => {
      this.newProducts = data;
    })
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

  newProductSelected(producto){
    // hacer un INSERT a la lista de miembros actual del grupo
    let index = _.findIndex(this.lista.products, (m) => {
      return m.id == producto.id;
    });
    if (index != -1) {
      let toast = {
        message: 'Ese producto ya fue agregado anteriormente!',
        duration: 3000
      };
      let toastObj = this.toastCtrl.create(toast);
      toastObj.present();
    }
    else {
      producto.count = 1;
      this.lista.products.push(producto);
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }
}
