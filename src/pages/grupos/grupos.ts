import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {DetalleGrupoPage} from "../detalle-grupo/detalle-grupo";

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

  grupos = [
    {name:'Familia'},
    {name:'Amigos'},
    {name:'Abuelos'},
    {name:'Novia'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }


//  irAHome(){
//    this.navCtrl.push(HomePage);
//  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GruposPage');
  }

  itemSelected(grupo){
    this.navCtrl.push(DetalleGrupoPage);
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo Grupo',
      message: "Ingrese el nombre del nuevo grupo",
      inputs: [
        {
          name: 'Nombre de grupo',
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
            this.navCtrl.push(DetalleGrupoPage);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
