import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ListasPage} from "../listas/listas";
import { AlertController } from 'ionic-angular';
import {ClientesPage} from "../clientes/clientes";

/**
 * Generated class for the DetalleGrupoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-grupo',
  templateUrl: 'detalle-grupo.html',
})
export class DetalleGrupoPage {

  nombreDelGrupo:string;
  members=[
    {name:'Juan'},
    {name:'Azul'},
    {name:'Florencia'},
    {name:'Cristobal'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController) {

    console.log(this.navParams.get('nombre'));
    this.nombreDelGrupo = this.navParams.get('nombre');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleGrupoPage');
  }

  showDelete(member) {
    let actionSheet = this.actionSheetCtrl.create({
      title: member.name,
      buttons: [
        {
          text: 'Eliminar del grupo',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  verListas(nombreDelGrupo){
    this.navCtrl.push(ListasPage,{nombreGrupo:nombreDelGrupo});
  }

  //verListaGrupo(){
  //  this.navCtrl.push(DetalleListaPage);
  //}

  searchNewMember(){
    this.navCtrl.push(ClientesPage);
  }

  doPromptNewMember() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo Integrante',
      message: "Ingrese el nombre del nuevo integrante del grupo",
      inputs: [

        {
          name: 'name',
          placeholder: 'Nombre del integrante'
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
            this.members.push({name:data.name});
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
