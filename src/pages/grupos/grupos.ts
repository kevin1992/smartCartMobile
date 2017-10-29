import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {DetalleGrupoPage} from "../detalle-grupo/detalle-grupo";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";
import * as _ from 'lodash';

/**
 * Generated class for the GruposPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
})


export class GruposPage {

  grupos = [];
  loading = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public apiService: ApiService) {
  }


//  irAHome(){
//    this.navCtrl.push(HomePage);
//  }

  ionViewWillEnter() {
    this.loading = true;
    this.apiService.get(API.URL + "groups", {}, {}).subscribe((grupos) => {
      grupos.forEach((grupo) => {
        grupo.members = _.cloneDeep(grupo.clients);
      });
      this.grupos = grupos;
      this.loading = false;
    });
  }

  itemSelected(grupo) {
    this.navCtrl.push(DetalleGrupoPage, {grupo: grupo});
  }

  addGroup() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo Grupo',
      message: "Ingrese el nombre del nuevo grupo",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre de grupo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Crear',
          handler: data => {
            //this.navCtrl.push(DetalleGrupoPage,{nombre:data.name});
            if (data.name && data.name.length > 0) {
              this.navCtrl.push(DetalleGrupoPage, {grupo: {nombre: data.name, members: []}, new: true});
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
