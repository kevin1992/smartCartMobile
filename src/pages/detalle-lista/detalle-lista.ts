import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ProductosPage} from "../productos/productos";

/**
 * Generated class for the DetalleListaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-lista',
  templateUrl: 'detalle-lista.html',
})
export class DetalleListaPage {

  nombreDeLista:string;
  producto: string = "1";
  products=[
    {name:'Coca Cola 2.25lt'},
    {name:'Arroz 300gr'},
    {name:'Leche 1lt'},
    {name:'Milanesas 1kg'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController) {

    console.log(this.navParams.get('nombreLista'));
    this.nombreDeLista = this.navParams.get('nombreLista');
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad DetalleListaPage');
    }

    searchNewProduct() {
      this.navCtrl.push(ProductosPage);
  }

  editNameList(){
    let prompt = this.alertCtrl.create({
      title: 'Renombrar Lista',
      message: "Ingrese nuevo nombre de lista",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nuevo nombre de Lista'
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
            //1) Update del nombre de lista
            //2) Refrescar pantalla Detalle Lista
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  /*  showDelete(member) {
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
  */
}
