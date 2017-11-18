import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AsociarCompraPage} from "../asociar-compra/asociar-compra";

/**
 * Generated class for the AsociarCompraGruposPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asociar-compra-grupos',
  templateUrl: 'asociar-compra-grupos.html',
})
export class AsociarCompraGruposPage {

  groupsQR = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeGroupsQR();
  }

  initializeGroupsQR(){
    this.groupsQR=[
      {name:'Amigos'},
      {name:'Amigos Futbol'},
      {name:'Proyecto Final'},
      {name:'Trabajo'},
    ]
  }

  getGroupsQR(product: any) {
    // Reset items back to all of the items
    this.initializeGroupsQR();

    // set val to the value of the searchbar
    var val = product.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.groupsQR = this.groupsQR.filter((groupQR) => {
        return (groupQR.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  groupQRSelected(){
    // Asociar el codigo QR que se escaneará con el grupo seleccionado
    this.navCtrl.push(AsociarCompraPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarCompraGruposPage');
  }

}
