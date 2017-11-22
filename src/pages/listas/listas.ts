import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";
import {DetalleListaPage} from "../detalle-lista/detalle-lista";
/**
 * Generated class for the ListasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listas',
  templateUrl: 'listas.html',
})

export class ListasPage {

  listas = [];
  loading = false;
  grupo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public apiService:ApiService) {
    this.grupo = this.navParams.get('grupo');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListasPage');
    this.loading = true;
    this.apiService.get(API.URL+"groups/"+this.grupo.id+"/lists",{},{}).subscribe((listas)=>{
      listas.forEach((l)=>{
        if(!l.products){
          l.products = [];
        }
        l.products.forEach((p)=>{
          p.count = p.pivot.count;
          p.count = parseInt(p.count);
          p.price = parseInt(p.price);
        });

      });
      this.listas = listas;
      this.loading = false;
    });

  }

  delete(item){
    this.apiService.delete(API.URL+"groups/"+this.grupo.id+"/lists/"+item.id,{},{successMsg:'La lista fue eliminada satisfactoriamente!'}).subscribe((data)=>{
      this.navCtrl.pop();
    });
  }


  itemSelected(lista){
    this.navCtrl.push(DetalleListaPage,{lista:lista,groupId:this.grupo.id});
  }

  doPromptNewList() {
    let prompt = this.alertCtrl.create({
      title: 'Nueva Lista',
      message: "Ingrese el nombre de la nueva lista",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre de Lista'
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
            //Crear la page para ingresar al listado de listas
            //this.navCtrl.push(DetalleListaPage,{nombre:data.name});
            //this.navCtrl.push(DetalleGrupoPage,{nombre:data.name});
            if (data.name && data.name.length > 0) {
              this.navCtrl.push(DetalleListaPage, {lista: {name: data.name, products: []},groupId:this.grupo.id, new: true});
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
