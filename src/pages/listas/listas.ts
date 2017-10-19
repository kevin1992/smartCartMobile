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

/*export class ListasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListasPage');
  }

}
*/
export class ListasPage {

  listas = [];
  loading = false;
  nombreDelGrupo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public apiService:ApiService) {
    this.nombreDelGrupo = this.navParams.get('nombreGrupo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListasPage');
    this.loading = true;
    this.apiService.get(API.URL+"/lists",{},{mock:[
      {id:1,name:'Lista semanal'},
      {id:2,name:'Lista cumpleaños'},
      {id:3,name:'Lista Cena'}
    ]}).subscribe((listas)=>{
      this.listas = listas;
      this.loading = false;
    });

  }

  itemSelected(lista){
    this.navCtrl.push(DetalleListaPage,{nombreLista:lista.name,id:lista.id});
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
            this.listas.push({name:data.name});
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
