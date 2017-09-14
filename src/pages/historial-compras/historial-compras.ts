import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ComprasPage} from "../compras/compras";

/**
 * Generated class for the HistorialComprasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial-compras',
  templateUrl: 'historial-compras.html',
})
export class HistorialComprasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
  }

  showActions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Acciones',
      buttons: [

        {
          text: 'Ver estadisticas',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialComprasPage');
  }

  verCompra(){
    this.navCtrl.push(ComprasPage);
  }
}
