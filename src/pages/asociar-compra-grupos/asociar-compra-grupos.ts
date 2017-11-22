import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AsociarCompraPage} from "../asociar-compra/asociar-compra";
import {API} from "../../app/app.component";
import * as _ from 'lodash';
import {ApiService} from "../../services/api.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiService:ApiService) {
    this.getGroupsQR()
  }

  getGroupsQR() {

    this.apiService.get(API.URL + "groups", {}, {}).subscribe((grupos) => {
      grupos.forEach((grupo) => {
        grupo.members = _.cloneDeep(grupo.clients);
      });
      this.groupsQR = grupos;
    });


  }

  groupQRSelected(group) {
    // Asociar el codigo QR que se escaneará con el grupo seleccionado
    this.navCtrl.push(AsociarCompraPage,{group:group});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarCompraGruposPage');
  }

}
