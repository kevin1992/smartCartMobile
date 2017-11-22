import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ComprasPage} from "../compras/compras";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";

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

  searchName;
  grupo = null;
  compras = [];
  loading = false;

  constructor(public apiService: ApiService, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {

    this.grupo = this.navParams.get('grupo');

  }

  getCompras() {
    return this.compras;
  }

  showActions() {
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

  verCompra(compra) {
    this.navCtrl.push(ComprasPage,{compra:compra});
  }

  ionViewWillEnter() {
    this.loading = true;
    if(this.grupo){
      this.apiService.get(API.URL + "groups/"+this.grupo.id+"/purchases", {}, {}).subscribe((compras) => {
        this.compras = compras;

        this.compras.forEach((l)=>{
          if(!l.products){
            l.products = [];
          }
          l.products.forEach((p)=>{
            p.count = p.pivot.count;
            p.count = parseInt(p.count);
            p.price = parseInt(p.price);
          });

        });

        this.loading = false;
      });
    }else{
      this.apiService.get(API.URL + "purchases", {}, {}).subscribe((compras) => {
        this.compras = compras;

        this.compras.forEach((l)=>{
          if(!l.products){
            l.products = [];
          }
          l.products.forEach((p)=>{
            p.count = p.pivot.count;
            p.count = parseInt(p.count);
            p.price = parseInt(p.price);
          });

        });

        this.loading = false;
      });
    }
  }

}
